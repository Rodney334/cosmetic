import { CustomErrorToast, CustomSuccessToast } from "@/components/CustomToast";
import { api } from "@/constantes/api.constante";
import axios from "axios";

export const forgetPassword = async (email: string) => {
  try {
    await axios.post(`${api.base_url}/auth/forget-password`, { email });
    return true;
  } catch (error) {
    return false;
  }
};
