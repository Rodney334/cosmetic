import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { LoginDataType } from "@/types/auth.type";
import { CustomErrorToast, CustomSuccessToast } from "@/components/CustomToast";
import { forgetPassword } from "@/utils/password";

const ForgetPass = () => {
  const router = useRouter();
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
  });

  const formik = useFormik({
    initialValues: {
      email: "rodneyvodounnou@gmail.com", // "lofun90@gmail.com",
    },
    validationSchema,
    onSubmit: async (values: { email: string }) => {
      setIsLoading(true);
      try {
        const result = await forgetPassword(values.email);

        if (!result) {
          CustomErrorToast({
            text: "Une erreur est survenue. Veuillez vérifier vos informations.",
          });
        } else {
          CustomSuccessToast({
            text: "Un mail de confirmation vous a été envoyé! Redirection en cours...",
          });
          // const id = setTimeout(() => router.push("/"), 2000);
          // setTimeoutId(id);
        }
      } catch (error) {
        CustomErrorToast({
          text: "Une erreur est survenue. Veuillez vérifier vos informations.",
        });
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
        {/* Section Connexion */}
        <div className="p-8 lg:p-12">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">
              Mot de passe oublié
            </h2>

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 flex flex-col items-center justify-center"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center mb-2">
                  Adresse mail de récupération
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`${
                  isLoading && "animate-pulse"
                } w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200 ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={isLoading}
              >
                Continuer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
