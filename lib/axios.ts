// lib/axios.ts
import { CustomToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

// Créer l'instance axios
const apiClient = axios.create({
  baseURL: api.base_url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour effacer le localStorage et rediriger
const handleTokenExpiration = () => {
  // Vider le localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  CustomToast({
    success: false,
    text: "Session expirée, veuillez vous reconnecter.",
  });
  // Vous pouvez ajouter d'autres clés selon votre application

  // Redirection vers la page de connexion
  if (typeof window !== "undefined") {
    window.location.href = "/public/login";
  }
};

// Intercepteur de requête - pour ajouter le token automatiquement
apiClient.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse - pour gérer l'expiration du token
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any;
    // console.log({ error: error.response.data.errors });

    // Vérifier si l'erreur est liée à l'authentification
    if (error.response?.data?.errors === "jwt expired") {
      // Vérifier si on n'a pas déjà tenté de rafraîchir le token
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        // Tenter de rafraîchir le token
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const response = await axios.get(
              `${api.base_url}/auth/refresh-token`
            );

            const { token: newToken } = response.data;
            localStorage.setItem("token", newToken);

            // Retry la requête originale avec le nouveau token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          } catch (refreshError) {
            // Si le refresh token est aussi expiré
            console.log("Refresh token expiré, redirection vers login");
            handleTokenExpiration();
          }
        } else {
          // Pas de refresh token disponible
          handleTokenExpiration();
        }
      }
    }

    // Pour les erreurs 403 (Forbidden) ou autres erreurs d'auth
    // if (error.response?.status === 403) {
    //   handleTokenExpiration();
    // }

    return Promise.reject(error);
  }
);

export default apiClient;

// Hook personnalisé pour utiliser le client avec Next.js router (optionnel)
export const useApiClient = () => {
  const router = useRouter();

  // Version alternative de handleTokenExpiration qui utilise le router Next.js
  const handleTokenExpirationWithRouter = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return { apiClient, handleTokenExpirationWithRouter };
};

// Fonctions utilitaires pour la gestion des tokens
export const tokenUtils = {
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },

  isTokenExpired: (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },
};
