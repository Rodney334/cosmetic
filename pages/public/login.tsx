import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Connexion:", { email, password });
  };

  const handleGoogleLogin = () => {
    console.log("Connexion avec Google");
  };

  return (
    <div
      className="mx-auto max-w-7xl w-full px-4 mt-20 min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/bg_login.png')" }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Section Connexion */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Se connecter
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    onClick={() => alert("Mot de passe oublié ?")}
                  >
                    Mot de passe oublié
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  Se connecter
                </button>
              </form>

              <div className="mt-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OU</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <FcGoogle className="w-5 h-5 mr-3" />
                Continuer avec Google
              </button>

              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                En créant un compte, j&apos;accepte les conditions
                d&apos;utilisation
              </p>
            </div>
          </div>

          {/* Séparateur vertical */}
          <div className="hidden lg:block w-px bg-gray-200"></div>

          {/* Section Création de compte */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-50">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Créer un compte
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                lobortis maximus
              </p>

              <ul className="space-y-3 mb-8">
                {Array(6)
                  .fill(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus"
                  )
                  .map((text, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">•</span>
                      <span className="text-sm text-gray-600">{text}</span>
                    </li>
                  ))}
              </ul>
              <Link href="/public/register">
                <button className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 px-4 rounded-full transition-colors duration-200 cursor-pointer">
                  Créer un compte
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
