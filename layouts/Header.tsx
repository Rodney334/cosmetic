import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HiUser } from "react-icons/hi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
                href="/mes-recettes"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Mes Recettes
              </Link>
              <Link
                href="/ingredients"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Ingrédients
              </Link>
              <Link
                href="/nouvelle-recette"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Nouvelle Recette
              </Link>
              <Link
                href="/guide"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Guide
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <select className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer">
              <option>French (France)</option>
            </select>
            <Link href="/public/login">
              <button className="flex items-center gap-2 bg-white text-black border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors cursor-pointer">
                <HiUser className="w-5 h-5 text-black" />
                Se connecter / Créer un compte
              </button>
            </Link>
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
                href="/mes-recettes"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Mes Recettes
              </Link>
              <Link
                href="/ingredients"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Ingrédients
              </Link>
              <Link
                href="/nouvelle-recette"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Nouvelle Recette
              </Link>
              <Link
                href="/guide"
                onClick={closeMenu}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
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
