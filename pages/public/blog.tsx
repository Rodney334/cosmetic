import React, { useState } from 'react';
import Image from 'next/image';

interface BlogArticle {
  id: number;
  title: string;
  duration: string;
  date: string;
  image: string;
}

interface Phase {
  id: string;
  label: string;
  active: boolean;
}

const CosmeticBlog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activePhase, setActivePhase] = useState<string>('tous');

  const phases: Phase[] = [
    { id: 'tous', label: 'Tous', active: true },
    { id: 'phase-a', label: 'Phase A', active: false },
    { id: 'phase-h', label: 'Phase H', active: false },
    { id: 'phase-e', label: 'Phase E', active: false },
    { id: 'phase-d', label: 'Phase D', active: false },
  ];

  const articles: BlogArticle[] = [
    {
      id: 1,
      title: "Dorem ipsum dolor sit amet, consectetur adipiscing elitis.",
      duration: "4 Min",
      date: "August 10, 2022",
      image: "/assets/guide1.png"
    },
    {
      id: 2,
      title: "Dorem ipsum dolor sit amet, consectetur adipiscing elitis.",
      duration: "4 Min",
      date: "August 10, 2022",
      image: "/assets/guide2.png"
    },
    {
      id: 3,
      title: "Dorem ipsum dolor sit amet, consectetur adipiscing elitis.",
      duration: "4 Min",
      date: "August 10, 2022",
      image: "/assets/guide3.png"
    },
    {
      id: 4,
      title: "Dorem ipsum dolor sit amet, consectetur adipiscing elitis.",
      duration: "4 Min",
      date: "August 15, 2022",
      image: "/assets/guide4.png"
    },
    {
      id: 5,
      title: "Dorem ipsum dolor sit amet, consectetur adipiscing elitis.",
      duration: "4 Min",
      date: "August 15, 2022",
      image: "/assets/guide5.png"
    }
  ];

  const handlePhaseClick = (phaseId: string): void => {
    setActivePhase(phaseId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#4B352A] opacity-80 p-6 py-24">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
        
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border mb-8 border-blue-100">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">GUIDE / BLOG</h1>
          
          {/* Search Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Rechercher un Article :</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Polem ipsum"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Phase Filters */}
            <div className="flex flex-wrap gap-2">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => handlePhaseClick(phase.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
                    activePhase === phase.id
                      ? 'bg-[#4B352A] text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {phase.label}
                </button>
              ))}
            </div>
            
            <p className="text-orange-500 text-sm">
              (Cliquer sur une Phase pour voir les Articles par catégorie)
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <div className="bg-[#4B352A] opacity-80 backdrop-blur-md rounded-xl p-6 border border-[#4B352A]">
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center space-x-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-24 h-16 bg-pink-200 rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={120}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-black">
                    <span>{article.duration}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Voir plus button */}
          <div className="flex justify-center mt-6">
            <button className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
              Voir plus
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Bienvenue Curieux Cosmétique
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex turpis molestie, rhoncus est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
            risus sem sollicitudin lectus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, ut ornare feugiat lectus. Class aptent taciti sociosqu ad 
            litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus lectus sit rutrum dignissim, ut scelerisque ante pulvinar. Donec ut bibendum 
            ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum ante. Morbi convallis convallis elit et cursus faucibus. Aliquam ut elementum 
            tellus.
          </p>
        </div>

        {/* Section 2 : Vidéo */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-blue-100">
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-lg">
            {/* Bande noire top */}
            <div className="bg-black h-4 w-full"></div>

            {/* Contenu vidéo */}
            <div className="relative bg-black aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Amug-gIV7ng"
                title="Calculateur Cosmétique - Cosmessence Bio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Bande noire bottom */}
            <div className="bg-black h-4 w-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CosmeticBlog;