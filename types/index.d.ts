import { NextPage } from "next";
import { ReactElement } from "react";
import { DefaultSession, DefaultUser } from "next-auth";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
  isDashboard?: boolean;
};

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
