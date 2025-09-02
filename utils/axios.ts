import { api } from "@/constantes/api.constante";
import axios from "axios";
import { signOut } from "next-auth/react";

export enum SessionExpire {
  AVALABLE = "AVALABLE",
  EXPIRE = "EXPIRE",
  NOTHING = "NOTHING",
}

export const httpClient = axios.create({
  baseURL: api.base_url,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const checkIfTokenIsValid = async (token?: string) => {
  try {
    if (!token) return SessionExpire.NOTHING;
    await axios.get(`${api.base_url}/auth/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return SessionExpire.AVALABLE;
  } catch (error: any) {
    console.log("signout");
    if (error.response?.status === 401) {
      return SessionExpire.EXPIRE;
    }
    return SessionExpire.AVALABLE;
  }
};
