// components/TokenExpirationHandler.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkIfTokenIsValid, SessionExpire } from "@/utils/axios";

const TokenExpirationHandler = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (session?.accessToken) {
        const isValid = await checkIfTokenIsValid(session.accessToken);
        if (isValid === SessionExpire.EXPIRE) {
          // Forcer la déconnexion côté client
          await fetch("/api/auth/signout", { method: "POST" });
          router.push("/public/login");
        }
      }
    };

    // Vérifier le token périodiquement (toutes les 5 minutes)
    const interval = setInterval(checkTokenValidity, 5 * 60 * 1000);

    // Vérifier immédiatement au chargement
    checkTokenValidity();

    return () => clearInterval(interval);
  }, [session, router, update]);

  return null;
};

export default TokenExpirationHandler;
