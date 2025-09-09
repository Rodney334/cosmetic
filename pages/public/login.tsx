import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { LoginDataType } from "@/types/auth.type";
import { CustomToast } from "@/components/CustomToast";
import apiClient from "@/lib/axios";
import { authStore } from "@/stores/auth.store";

const Login = () => {
  const router = useRouter();
  const { setUser, setToken, setRefreshToken } = authStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Nettoyage du timeout si le composant est démonté
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Veuillez entrer une adresse email valide")
      .required("L'email est obligatoire"),
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, // (?=.*[!@#$%^&*])
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .required("Le mot de passe est obligatoire"),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleGoogleLogin = () => {
    console.log("Connexion avec Google");
  };

  const formik = useFormik({
    initialValues: {
      email: "lofun90@gmail.com", // "rodneyvodounnou@gmail.com",
      password: "Babatounde1998", // "Azerty123@",
    },
    validationSchema,
    onSubmit: async (values: LoginDataType) => {
      // Ici vous pourriez ajouter votre logique de soumission (API call, etc.)
      setIsLoading(true);
      console.log("yes");
      try {
        const response = await apiClient.post("/auth/login", values);
        CustomToast({
          success: true,
          text: "Connexion réussie ! Redirection en cours...",
        });
        const { accessToken, refreshToken, user } = response.data;

        // Stocker les tokens et informations utilisateur
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);

        const id = setTimeout(() => {
          router.push("/");
        }, 2000);
        setTimeoutId(id);
      } catch (error) {
        CustomToast({ success: false, text: "Identifiant invalide." });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div
      className="mx-auto max-w-7xl w-full px-4 mt-20 min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/bg_login.png')" }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Section Connexion */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Se connecter
              </h2>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <Link
                    href={"/public/forget-password"}
                    className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
                  >
                    Mot de passe oublié
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`${
                    isLoading ? "animate-pulse" : ""
                  } w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200 cursor-pointer`}
                  disabled={isLoading}
                >
                  Se connecter
                </button>
              </form>

              {/* <div className="mt-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OU</span>
                  </div>
                </div>
              </div> */}

              {/* <button
                onClick={handleGoogleLogin}
                className="text-gray-600 w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <FcGoogle className="w-5 h-5 mr-3" />
                Continuer avec Google
              </button> */}

              {/* <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                En créant un compte, j&apos;accepte les conditions
                d&apos;utilisation
              </p> */}
            </div>
          </div>

          {/* Séparateur vertical */}
          <div className="hidden lg:block w-px bg-gray-200"></div>

          {/* Section Création de compte */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-50">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Créer un compte
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                lobortis maximus
              </p>

              <ul className="space-y-3 mb-8">
                {Array(6)
                  .fill(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus"
                  )
                  .map((text, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">•</span>
                      <span className="text-sm text-gray-600">{text}</span>
                    </li>
                  ))}
              </ul>
              <Link href="/public/register">
                <button className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 px-4 rounded-full transition-colors duration-200 cursor-pointer">
                  Créer un compte
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
