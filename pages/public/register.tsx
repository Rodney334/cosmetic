import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import { RegisterDataType } from "@/types/auth.type";
import { api } from "@/constantes/api.constante";
import { CustomErrorToast, CustomSuccessToast } from "@/components/CustomToast";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const genres = [
    {
      label: "Femme",
      value: "girls"
    },
    {
      label: "Homme",
      value: "boys"
    }
  ];

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Nettoyage du timeout si le composant est démonté
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);


  // Schéma de validation avec Yup
  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est obligatoire"),
    prenoms: Yup.string().required("Les prénoms sont obligatoires"),
    email: Yup.string()
      .email("Veuillez entrer une adresse email valide")
      .required("L'email est obligatoire"),
    telephone: Yup.string()
      .matches(/^[0-9]+$/, "Le numéro de téléphone ne doit contenir que des chiffres")
      .min(10, "Le numéro de téléphone doit avoir au moins 10 chiffres")
      .required("Le téléphone est obligatoire"),
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .required("Le mot de passe est obligatoire"),
    genre: Yup.string().required("Le genre est obligatoire"),
    acceptTerms: Yup.boolean()
      .oneOf([true], "Vous devez accepter les conditions d'utilisation")
      .required("Vous devez accepter les conditions d'utilisation"),
    acceptMarketing: Yup.boolean()
      .oneOf([true], "Vous devez accepter les conditions marketing")
      .required("Vous devez accepter les conditions marketing"),
  });

  // Initialisation de Formik
  const formik = useFormik({
    initialValues: {
      nom: "",
      prenoms: "",
      email: "",
      telephone: "",
      password: "",
      genre: "",
      acceptTerms: false,
      acceptMarketing: false,
    },
    validationSchema,
    onSubmit: (values: RegisterDataType) => {
      // Ici vous pourriez ajouter votre logique de soumission (API call, etc.)
      console.log("Form submitted:", values);
      const validateData = {
        name: `${values.nom} ${values.prenoms}`,
        email: values.email,
        password: values.password,
        phoneNumber: values.telephone,
        genderrole: values.genre
      };
      axios.post(`${api.base_url}/auth/register`, validateData)
        .then((data) => {
          CustomSuccessToast("Inscription réussie ! Redirection en cours...");
          const id = setTimeout(() => {
            router.push("/public/login");
          }, 2000);
          setTimeoutId(id);
        })
        .catch((error) => {
          console.log("failed :", error);
          CustomErrorToast("Erreur d'inscription. Veuillez vérifier vos informations.");
        });
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row justify-center">
      <Toaster />
      <div className="w-full md:w-1/2 flex flex-col justify-start items-center md:items-start px-6 md:px-16 pt-20 md:pt-28 pb-4 md:pb-12 relative">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Intelligemment Belle
          </h1>
          <p className="text-gray-300 text-base md:text-xl leading-relaxed">
            Korem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Geometric figure */}
        <div className="mt-8 md:mt-0 md:absolute md:bottom-64 md:left-16">
          <Image
            src="/assets/fg_geometric.png"
            alt="Geometric figure"
            width={250}
            height={150}
            className="mx-auto md:mx-0"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 mt-8 md:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Créer votre compte
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Nom et Prénoms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formik.values.nom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border ${formik.touched.nom && formik.errors.nom
                      ? "border-red-500"
                      : "border-gray-200"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                  />
                  {formik.touched.nom && formik.errors.nom && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.nom}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="prenoms"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Prénoms
                  </label>
                  <input
                    type="text"
                    id="prenoms"
                    name="prenoms"
                    value={formik.values.prenoms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border ${formik.touched.prenoms && formik.errors.prenoms
                      ? "border-red-500"
                      : "border-gray-200"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                  />
                  {formik.touched.prenoms && formik.errors.prenoms && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.prenoms}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border ${formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-200"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Téléphone
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-gray-200 bg-gray-50 rounded-l-lg">
                    <span className="text-sm mr-2">🇺🇸</span>
                    <span className="text-gray-600">+1</span>
                  </div>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 px-4 py-3 border ${formik.touched.telephone && formik.errors.telephone
                      ? "border-red-500"
                      : "border-gray-200"
                      } rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                  />
                </div>
                {formik.touched.telephone && formik.errors.telephone && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.telephone}</p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <div className="relative">
                  <select
                    id="genre"
                    name="genre"
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border ${formik.touched.genre && formik.errors.genre
                      ? "border-red-500"
                      : "border-gray-200"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white`}
                  >
                    <option value="">Genre</option>
                    {genres.map((genre, index) => (
                      <option key={index} value={genre.value}>
                        {genre.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
                {formik.touched.genre && formik.errors.genre && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.genre}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 pr-12 border ${formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-200"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Utilisez 8 caractères ou plus avec des lettres, chiffres & symboles
                  </p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formik.values.acceptTerms}
                    onChange={formik.handleChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    En créant un compte, j'accepte les conditions d'utilisation
                  </span>
                </label>
                {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.acceptTerms}</p>
                )}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="acceptMarketing"
                    name="acceptMarketing"
                    checked={formik.values.acceptMarketing}
                    onChange={formik.handleChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    En créant un compte, j'accepte de recevoir des messages SMS, e-mails
                    sur les nouveautés, événements et promotions marketing.
                  </span>
                </label>
                {formik.touched.acceptMarketing && formik.errors.acceptMarketing && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.acceptMarketing}</p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* Bouton "Créer" */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-8 rounded-full transition-colors cursor-pointer"
                // disabled={formik.isSubmitting}
                >
                  Créer
                </button>

                {/* Lien "S'identifier" */}
                <span className="text-sm text-gray-600">
                  Vous avez déjà un compte ?
                  <Link
                    href="/public/login"
                    className="text-blue-600 hover:text-blue-700 ml-1"
                  >
                    S'identifier
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;