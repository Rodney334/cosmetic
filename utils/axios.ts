import { api } from "@/constantes/api.constante";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: api.base_url,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
