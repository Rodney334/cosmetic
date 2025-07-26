import React, { useState } from 'react';
import { Search } from 'lucide-react';

const MesRecettesInterface = () => {
  const [searchRecipe, setSearchRecipe] = useState<string>('');

  // Sample recipes data
  const recipes = [
    {
      id: 1,
      title: "Vorem ipsum dolor",
      description: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestae, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet faucibus lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.",
      image: "/assets/recette1.jpg"
    },
    {
      id: 2,
      title: "Vorem ipsum dolor",
      description: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestae, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet faucibus lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.",
      image: "/assets/recette2.jpg"
    },
    {
      id: 3,
      title: "Vorem ipsum dolor",
      description: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestae, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet faucibus lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.",
      image: "/assets/recette3.jpg"
    },
    {
      id: 4,
      title: "Vorem ipsum dolor",
      description: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestae, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet faucibus lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.",
      image: "/assets/recette4.jpg"
    },
    {
      id: 5,
      title: "Vorem ipsum dolor",
      description: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestae, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet faucibus lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.",
      image: "/assets/recette5.jpg"
    }
  ];

  return (
    <div className='min-h-screen bg-[#4B352A] opacity-80 p-6 py-24'>
      <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-blue-500 mb-6">MES RECETTES</h1>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-4">
          <label className="font-medium text-gray-700">Rechercher une Recette :</label>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Lorem ipsum"
              value={searchRecipe}
              onChange={(e) => setSearchRecipe(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Recipes List */}
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex">
              {/* Recipe Image */}
              <div className="w-64 h-48 flex-shrink-0">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Recipe Content */}
              <div className="flex-1 p-6">
                <h2 className="text-xl font-medium text-gray-800 mb-3">
                  {recipe.title}
                </h2>
                
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {recipe.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 cursor-pointer">
                    Modifier
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 cursor-pointer">
                    Exporter PDF
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 cursor-pointer">
                    Exporter Excel
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 cursor-pointer">
                    Imprimer
                  </button>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600 cursor-pointer">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warning Message */}
      <div className="mt-8 p-3 bg-orange-50 border border-orange-200 rounded flex items-center gap-2">
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-orange-500"></div>
        <span className="text-orange-700 text-sm">
          Une recette supprimée ne peut être retrouvée.
        </span>
      </div>
    </div>
    </div>
  );
};

export default MesRecettesInterface;