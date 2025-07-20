import Link from 'next/link';

const Header = () => {

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900 dark:text-white shadow-md">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo Section */}
        <h1 className="text-2xl font-bold tracking-tight hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300">
          Calculateur Cosmétique
        </h1>

        {/* Navigation Section */}
        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-lg font-medium hover:underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link
            href="/public/login"
            className="text-lg font-medium hover:underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300"
          >
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
