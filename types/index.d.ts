import { NextPage } from "next";
import { ReactElement } from "react";
import { DefaultSession, DefaultUser } from "next-auth";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
  isDashboard?: boolean;
};

// declare module "next-auth" {
//   interface User extends DefaultUser {
//     accessToken?: string;
//     refreshToken?: string;
//     // Ajoutez d'autres champs si nécessaire
//   }

//   interface Session extends DefaultSession {
//     user: User;
//     accessToken?: string;
//     refreshToken?: string;
//   }
// }

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session extends DefaultSession {
    user: User & {
      id: string; // Assurez-vous que l'ID est bien présent sur l'utilisateur de la session
    };
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
