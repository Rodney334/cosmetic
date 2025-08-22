// /lib/auth.ts
import { api } from "@/constantes/api.constante";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${api.base_url}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (response.data) {
            // Return object must match NextAuth's User type
            return {
              id: response.data.user._id, // Required field
              role: response.data.user.role, // Required field
              email: response.data.user.email,
              name: response.data.user.name || "",
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "Secrete key 1234567890",
  pages: {
    signIn: "/public/login",
  },
  callbacks: {
    // Le callback jwt est appelé en premier
    async jwt({ token, user }) {
      // Lors de la connexion initiale, l'objet 'user' est disponible
      if (user) {
        token.id = user.id; // Persiste l'ID utilisateur dans le jeton
        token.role = user.role;
        token.accessToken = user.accessToken; //
        token.refreshToken = user.refreshToken; //
      }
      return token;
    },
    // Le callback session est appelé ensuite, avec le token ci-dessus
    async session({ session, token }) {
      // Ajoute les données du token à l'objet de session
      if (token && session.user) {
        session.user.id = token.id as string; // Ajoute l'ID à l'objet user de la session
        session.user.role = token.role as string; // Ajoute l'ID à l'objet user de la session
        session.accessToken = token.accessToken; //
        session.refreshToken = token.refreshToken; //
      }
      return session;
    },
  },
};
