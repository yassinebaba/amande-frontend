import React from "react";

const estheticiennes = [
  {
    nom: "Amina",
    image: "/team/amina.jpg",
    description: "Spécialiste en soins du visage et épilation orientale.",
    specialite: "Soins visage",
  },
  {
    nom: "Leila",
    image: "/team/leila.jpg",
    description: "Experte massage relaxant et soins du corps.",
    specialite: "Massage",
  },
  {
    nom: "Sofia",
    image: "/team/sofia.jpg",
    description: "Esthéticienne polyvalente avec plus de 10 ans d’expérience.",
    specialite: "Polyvalente",
  },
  {
    nom: "Nora",
    image: "/team/nora.jpg",
    description: "Passionnée de beauté naturelle et soins personnalisés.",
    specialite: "Beauté naturelle",
  },
];

export default function EquipeSection() {
  return (
    <section className="py-16 bg-white" id="equipe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Notre équipe</h2>
        <p className="text-lg text-gray-600 mb-12">
          Des professionnels passionnés à votre service
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-center items-stretch">
          {estheticiennes.map((e, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition transform hover:scale-105 rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <img
                  src={e.image}
                  alt={e.nom}
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-pink-100"
                />
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#cba670] text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {e.specialite}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{e.nom}</h3>
              <p className="text-sm text-gray-600 mt-2">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
