import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    telephone: "",
    password: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row justify-center">
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
            src="/fg_geometric.png"
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
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
                    value={formData.prenoms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
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
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
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
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Utilisez 8 caractères ou plus avec des lettres, chiffres &
                  symboles
                </p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    En créant un compte, j'accepte les conditions d'utilisation
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={acceptMarketing}
                    onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    En créant un compte, j'accepte de recevoir des messages SMS,
                    e-mails sur les nouveautés, événements et promotions
                    marketing.
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-between mt-4">
                {/* Bouton "Créer" */}
                <button
                  type="submit"
                  className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium py-2.5 px-8 rounded-full transition-colors cursor-pointer"
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
