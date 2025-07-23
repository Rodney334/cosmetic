import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Liens Utiles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/mes-recettes" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Mes Recettes
                </Link>
              </li>
              <li>
                <Link href="/nouvelles-recettes" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Nouvelles Recettes
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Ingrédients
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Aide & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/service-client" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Service Client
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contactez-nous
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/usage-informations" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Usage des informations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Communauté</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/agences" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Agences
                </Link>
              </li>
              <li>
                <Link href="/freelancers" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Freelancers
                </Link>
              </li>
              <li>
                <Link href="/engineers" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Engineers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Télécharger l'app</h3>
            <div className="space-y-3">
              <Link 
                href="#" 
                className="block w-full max-w-[140px]"
                aria-label="Télécharger sur l'App Store"
              >
                <div className="bg-black text-white rounded-md px-3 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Link>

              <Link 
                href="#" 
                className="block w-full max-w-[140px]"
                aria-label="Obtenir sur Google Play"
              >
                <div className="bg-black text-white rounded-md px-3 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright et liens légaux */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <span className="text-gray-600 text-sm">@copyright 2025</span>
              <div className="flex space-x-6">
                <Link href="/aide" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Aide
                </Link>
                <Link href="/politique" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Politique
                </Link>
                <Link href="/termes" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Termes
                </Link>
              </div>
            </div>

            {/* Réseaux sociaux et sélecteur de langue */}
            <div className="flex items-center space-x-6">
              {/* Réseaux sociaux */}
              <div className="flex space-x-4">
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>

              {/* Sélecteur de langue */}
              <div className="flex items-center space-x-2">
                <select className="text-sm text-gray-600 bg-transparent border border-gray-300 rounded-md px-3 py-1 outline-none cursor-pointer hover:border-gray-400 transition-colors">
                  <option>French (France)</option>
                  <option>English (US)</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;