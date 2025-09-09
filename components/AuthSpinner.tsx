export const AuthSpinner = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Vérification de l'authentification...
      </p>
    </div>
  </div>
);
