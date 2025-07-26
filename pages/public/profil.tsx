import { useState } from "react";
import { ChevronDown, Mail, Plus } from "lucide-react";
import Image from "next/image";

const Profil = () => {
  const [formData, setFormData] = useState({
    nom: "",
    pseudo: "",
    genre: "",
    pays: "",
    langue: "",
    zoneHoraire: "",
  });

  const [emails] = useState([
    {
      id: 1,
      email: "alexarawles@gmail.com",
      timeAgo: "1 mois déjà",
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const genres = ["Homme", "Femme", "Autre", "Préfère ne pas dire"];
  const pays = ["France", "Belgique", "Suisse", "Canada", "Autre"];
  const langues = ["Français", "Anglais", "Espagnol", "Allemand", "Autre"];
  const zonesHoraires = [
    "GMT+1 (Paris)",
    "GMT+0 (Londres)",
    "GMT-5 (New York)",
    "GMT+8 (Tokyo)",
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6 justify-start pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#DDE5FF] rounded-t-2xl h-32 relative"></div>

        <div className="bg-white rounded-b-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8 -mt-16 pt-9">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/assets/profile.png"
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Alexa Rawles
                </h1>
                <p className="text-gray-600">alexarawles@gmail.com</p>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                placeholder="Nom"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Pseudo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pseudo
              </label>
              <input
                type="text"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleInputChange}
                placeholder="Pseudo"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <div className="relative">
                <select
                  value={formData.genre}
                  onChange={(e) => handleSelectChange("genre", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays
              </label>
              <div className="relative">
                <select
                  value={formData.pays}
                  onChange={(e) => handleSelectChange("pays", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Pays</option>
                  {pays.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Langue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langue
              </label>
              <div className="relative">
                <select
                  value={formData.langue}
                  onChange={(e) => handleSelectChange("langue", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Langue</option>
                  {langues.map((langue) => (
                    <option key={langue} value={langue}>
                      {langue}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Zone Horaire */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone Horaire
              </label>
              <div className="relative">
                <select
                  value={formData.zoneHoraire}
                  onChange={(e) =>
                    handleSelectChange("zoneHoraire", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Zone Horaire</option>
                  {zonesHoraires.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Email section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Mon Address Email
            </h2>

            {/* Email list */}
            <div className="space-y-3 mb-4">
              {emails.map((emailItem) => (
                <div
                  key={emailItem.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <Mail className="text-white" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {emailItem.email}
                    </p>
                    <p className="text-sm text-gray-500">{emailItem.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add email button */}
            <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors cursor-pointer">
              <Plus size={16} />
              <span>Ajouter une Address Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
