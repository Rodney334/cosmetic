import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HiUser } from "react-icons/hi";
import { authStore } from "@/stores/auth.store";

const Header = () => {
  const router = useRouter();
  const { user } = authStore();
  console.log({ user });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fonction pour vérifier si un lien est actif
  const isActiveLink = (href: string) => {
    return router.pathname === href;
  };

  // Classes pour les liens actifs et inactifs
  const getLinkClasses = (href: string, isMobile: boolean = false) => {
    const baseClasses = isMobile
      ? "block px-3 py-2 rounded-md transition-colors"
      : "transition-colors";

    const activeClasses = isMobile
      ? "text-[#4B352A] bg-[#4B352A]font-medium"
      : "text-[#4B352A] font-bold pb-1";

    const inactiveClasses = isMobile
      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      : "text-gray-600 hover:text-gray-900";

    return `${baseClasses} ${
      isActiveLink(href) ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-xl font-bold text-gray-900">CosmetiCalc</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/public/recette"
                className={getLinkClasses("/public/recette")}
              >
                Mes Recettes
              </Link>
              <Link
                href="/public/ingredient"
                className={getLinkClasses("/public/ingredient")}
              >
                Ingrédients
              </Link>
              <Link
                href="/public/recette-create"
                className={getLinkClasses("/public/recette-create")}
              >
                Nouvelle Recette
              </Link>
              <Link
                href="/public/blog"
                className={getLinkClasses("/public/blog")}
              >
                Guide
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <select className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer">
              <option>French (France)</option>
            </select>
            {user.email ? (
              <Link
                href="/private/dashboard"
                className="flex lg:flex-row sm:flex-col items-center lg:p-2 px-2 gap-2 bg-white text-black border border-black rounded-md text-sm hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <HiUser className="w-5 h-5" />
                <p className="lg:pt-2">{user.name}</p>
              </Link>
            ) : (
              <Link href="/public/login">
                <button className="flex items-center gap-2 bg-white text-black border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors cursor-pointer">
                  <HiUser className="w-5 h-5 text-black" />
                  Se connecter / Créer un compte
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <select className="text-xs text-gray-600 bg-transparent border-none outline-none cursor-pointer">
              <option>FR</option>
            </select>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/public/recette"
                onClick={closeMenu}
                className={getLinkClasses("/public/recette", true)}
              >
                Mes Recettes
              </Link>
              <Link
                href="/public/ingredient"
                onClick={closeMenu}
                className={getLinkClasses("/public/ingredient", true)}
              >
                Ingrédients
              </Link>
              <Link
                href="/public/recette-create"
                onClick={closeMenu}
                className={getLinkClasses("/public/recette-create", true)}
              >
                Nouvelle Recette
              </Link>
              <Link
                href="/public/blog"
                onClick={closeMenu}
                className={getLinkClasses("/public/blog", true)}
              >
                Guide
              </Link>

              {/* Bouton de connexion mobile */}
              <Link href="/public/login">
                <div className="px-3 py-2">
                  <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
                    Se connecter / Créer un compte
                  </button>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
