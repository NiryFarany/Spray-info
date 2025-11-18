/* import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About us </h1>
      <p>We are a training center dedicated to helping you achieve your goals </p>
    </div>
  );
};

export default AboutUs; */
import React from 'react';
import { Link } from "react-router-dom";
import { AcademicCapIcon, BriefcaseIcon, LightningBoltIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Bannière de Titre - Utilisation d'un fond bleu subtil ou juste un padding */}
      <header className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Titre principal : Utilisation du bleu profond de votre branding */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4">
            À Propos de <span className="text-cyan-600">Spray Info</span>
          </h1>
          {/* Slogan */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl">
            Votre partenaire en formation intensive IT, dédié à votre réussite professionnelle à Fianarantsoa.
          </p>
        </div>
      </header>

      <main className="container mx-auto p-6 md:p-12 max-w-5xl">
        
        {/* Section 1 : Notre Mission et Vision */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-2 border-cyan-400 pb-2">
            Notre Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                    Chez Spray Info Formation, notre mission est de combler le fossé entre le talent local et les exigences du marché IT international. Nous fournissons des formations techniques de pointe en **Réseau, Développement, DevOps et Data Science**.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Nous croyons que le succès s'atteint par l'engagement total. C'est pourquoi nous proposons des **cours 100% en présentiel** et un **accompagnement complet jusqu'à l'obtention d'un emploi**.
                </p>
            </div>
            {/* Vous pourriez insérer ici une image ou un encadré clé */}
            <div className="bg-blue-50 border-l-4 border-cyan-500 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-900 flex items-center mb-2">
                    <LightningBoltIcon className="h-6 w-6 text-cyan-500 mr-3"/>
                    Notre Vision
                </h3>
                <p className="text-gray-700">
                    Devenir le centre de formation IT de référence à Madagascar, reconnu pour la qualité exceptionnelle de ses diplômés, prêts à intégrer les entreprises technologiques les plus exigeantes.
                </p>
            </div>
          </div>
        </section>

        {/* Section 2 : Pourquoi nous choisir - Nos Différenciateurs */}
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 border-b-2 border-cyan-400 pb-2 text-center">
                Ce qui fait notre différence
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
                
                {/* Carte 1: 100% Présentiel */}
                <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                    <LocationMarkerIcon className="h-10 w-10 text-cyan-500 mx-auto mb-3"/>
                    <h3 className="font-bold text-lg text-blue-900 mb-2">Formation 100% Présentiel</h3>
                    <p className="text-sm text-gray-600">Un apprentissage intensif et immersif, sans distraction, pour une meilleure rétention.</p>
                </div>

                {/* Carte 2: Certificat */}
                <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                    <AcademicCapIcon className="h-10 w-10 text-cyan-500 mx-auto mb-3"/>
                    <h3 className="font-bold text-lg text-blue-900 mb-2">Certifications Officielles</h3>
                    <p className="text-sm text-gray-600">Des diplômes reconnus, validant vos compétences IT techniques de haut niveau.</p>
                </div>

                {/* Carte 3: Employabilité */}
                <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                    <BriefcaseIcon className="h-10 w-10 text-cyan-500 mx-auto mb-3"/>
                    <h3 className="font-bold text-lg text-blue-900 mb-2">Accompagnement Emploi</h3>
                    <p className="text-sm text-gray-600">Nous vous soutenons activement dans la recherche de votre premier poste qualifié.</p>
                </div>
                
                {/* Carte 4: Localisation */}
                <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                    <LocationMarkerIcon className="h-10 w-10 text-cyan-500 mx-auto mb-3"/>
                    <h3 className="font-bold text-lg text-blue-900 mb-2">Implanté à Fianarantsoa</h3>
                    <p className="text-sm text-gray-600">Un engagement fort pour le développement des compétences dans la région.</p>
                </div>

            </div>
        </section>
        
        {/* Section Contact / CTA */}
         <section className="text-center bg-blue-900 text-white p-10 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-3">Prêt à devenir un Expert IT ?</h2>
            <p className="text-lg mb-6 opacity-90">Découvrez nos programmes intensifs et lancez votre carrière.</p>
            <Link
                to="/formations"
                className="inline-flex items-center bg-cyan-500 hover:bg-cyan-400 text-blue-900 font-bold text-xl py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
            >
                Voir les Formations
            </Link>
        </section>

      </main>
      
      {/* Le pied de page sera affiché automatiquement s'il est dans un composant Layout */}
    </div>
  );
};

export default AboutUs;