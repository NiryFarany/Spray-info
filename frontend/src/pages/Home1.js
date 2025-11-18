// src/pages/Home.js → VERSION FINALE SIMPLE, ÉLÉGANTE, PUISSANTE

import { Link } from "react-router-dom";
//import { ArrowRightIcon, MapPinIcon, AcademicCapIcon, PhoneIcon } from "@heroicons/react/outline";
//MapPinIcon
import { ArrowRightIcon, LocationMarkerIcon, AcademicCapIcon, PhoneIcon } from "@heroicons/react/outline";


export default function Home() {
  return (
    <>
      {/* HERO PRINCIPAL — TOUT EN UN */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white flex items-center justify-center overflow-hidden">
        {/* Logo en fond subtil */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/logo-sprayinfo-white.png" 
            alt="Sprayyyyyyyy Info" 
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = 'none'}
          /> ccc
        </div>

        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Contenu centré */}
        <div className="relative container mx-auto px-6 text-center z-10">
          <div className="max-w-5xl mx-auto">
            {/* Logo principal */}
            <img 
            //   src="/logo-sprayinfo-white.png"
              src="../assets/images/sprayinfo.jpeg" 
              alt="Spray Info Formation" 
              className="h-32 md:h-40 mx-auto mb-8"
              onError={(e) => e.target.style.display = 'none'}
            />

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Devenez un <span className="text-cyan-400">Expert IT</span><br />
              à Fianarantsoa
            </h1>

            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Formations intensives <strong>100% en présentiel</strong><br />
              Réseau • Développement • DevOps • Data Science<br />
              <span className="text-cyan-300">Avec accompagnement jusqu’à l’emploi</span>
            </p>

            {/* Icônes rapides */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 text-cyan-200">
              <div className="flex flex-col items-center">
                <LocationMarkerIcon className="h-10 w-10 mb-2" />
                <span className="text-sm">Fianarantsoa</span>
              </div>
              <div className="flex flex-col items-center">
                <AcademicCapIcon className="h-10 w-10 mb-2" />
                <span className="text-sm">Certificat officiel</span>
              </div>
              <div className="flex flex-col items-center">
                <PhoneIcon className="h-10 w-10 mb-2" />
                <span className="text-sm">Paiement MVola</span>
              </div>
            </div>

            {/* CTA PUISSANTS */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/formations"
                className="bg-cyan-500 hover:bg-cyan-400 text-blue-900 font-bold text-xl py-6 px-16 rounded-full shadow-2xl transition transform hover:scale-105 inline-flex items-center justify-center"
              >
                Voir les formations
                <ArrowRightIcon className="h-8 w-8 ml-4" />
              </Link>

              <a
                href="https://wa.me/261383793053?text=Salama!%20Misy%20formation%20inona%20ho%20avy%20eo%20amin'ny%20Spray%20Info?"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-800 font-bold text-xl py-6 px-16 rounded-full shadow-2xl hover:bg-gray-100 transition transform hover:scale-105 inline-flex items-center justify-center"
              >
                Contact WhatsApp
              </a>
            </div>

            {/* Petit texte final */}
            <p className="mt-12 text-lg opacity-80">
              Quartier Imandry • Fianarantsoa • <strong>+261 38 37 930 53</strong>
            </p>
          </div>
        </div>

        {/* Vague douce en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 150L80 120L160 140L240 110L320 130L400 100L480 130L560 90L640 120L720 80L800 110L880 70L960 100L1040 60L1120 90L1200 50L1280 80L1360 40L1440 70V150H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Footer reste inchangé — cohérence totale */}
    </>
  );
}