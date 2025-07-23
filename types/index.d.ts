import { NextPage } from "next";
import { ReactElement } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
  isDashboard?: boolean;
};
