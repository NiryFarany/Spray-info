// src/pages/Home.js → VERSION 100% FONCTIONNELLE (logo + fond + tout parfait)

import { Link } from "react-router-dom";
import { ArrowRightIcon, LocationMarkerIcon, AcademicCapIcon, PhoneIcon } from "@heroicons/react/outline";
//import SprayInfoLogo from '../assets/images/sprayInfo.jpeg'; // Renommé pour plus de clarté
//import SprayInfoLogo from '../assets/images/sprayInfo.jpeg';
import sprayInfoWhite from '../assets/images/sprayInfo.jpeg';

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-red-900 via-blue-800 to-blue-950 text-white flex items-center justify-center px-6 overflow-hidden">
       {/* ay oa */}
        {/* Fond logo très subtil — CHEMIN PUBLIC = TOUJOURS BON */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src={sprayInfoWhite}   
            alt="Spray Info Formation"
            className="w-full h-full object-cover object-center scale-150 filter blur-sm"
            onError={(e) => {
              e.target.style.display = 'none';
              console.log("Logo fond non trouvé → vérifie /public/logo/sprayInfo-white.png");
            }}
          />
        </div>

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Contenu principal */}
        <div className="relative text-center max-w-4xl mx-auto space-y-8 z-10">

          {/* Logo principal en haut */}
           {/* ← Même chemin, toujours bon */}
          <img
            src={sprayInfoWhite} 
            alt="Spray Info Formation2"
            className="h-24 md:h-32 mx-auto drop-shadow-2xl"
            onError={(e) => e.target.src = ''} // cache si introuvable
          />

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Devenez un <span className="text-cyan-400">Expert IT</span><br />
            à <span className="text-cyan-300">Fianarantsoa</span>
          </h1>

          <p className="text-lg md:text-2xl font-medium opacity-95 max-w-2xl mx-auto leading-snug">
            Formations intensives <strong className="text-cyan-300">100% en présentiel</strong><br />
            Réseau • Développement • DevOps • Data Science<br />
            <span className="text-cyan-400">Accompagnement jusqu’à l’emploi inclus</span>
          </p>

          {/* Icônes */}
          <div className="flex justify-center gap-10 md:gap-16 py-6 text-cyan-300">
            <div className="flex flex-col items-center">
              <LocationMarkerIcon className="h-8 w-8" />
              <span className="text-xs mt-1">Fianarantsoa</span>
            </div>
            <div className="flex flex-col items-center">
              <AcademicCapIcon className="h-8 w-8" />
              <span className="text-xs mt-1">Certificat officiel</span>
            </div>
            <div className="flex flex-col items-center">
              <PhoneIcon className="h-8 w-8" />
              <span className="text-xs mt-1">Paiement MVola</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <Link
              to="/formations"
              className="bg-cyan-500 hover:bg-cyan-400 text-blue-900 font-bold text-lg md:text-xl py-5 px-12 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-3"
            >
              Voir les formations
              <ArrowRightIcon className="h-7 w-7" />
            </Link>

            <a
              href="https://wa.me/261383793053?text=Salama!%20Te%20hiresaka%20momba%20ny%20formation%20ao%20aminny%20Spray%20Info"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-800 font-bold text-lg md:text-xl py-5 px-12 rounded-full shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-110"
            >
              Contact WhatsApp
            </a>
          </div>

          <p className="text-sm md:text-base opacity-70 pt-8">
            Quartier Imandry • Fianarantsoa • <strong className="text-cyan-300">+261 38 37 930 53</strong>
          </p>
        </div>

        {/* Vague finale */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 80L120 90L180 70L240 85L300 65L360 80L420 60L480 75L540 55L600 70L660anke50L720 65L780 45L840 60L900 40L960 55L1020 35L1080 50L1140 30L1200 45L1260 25L1320 40L1380 20L1440 35V100H0Z" fill="white"/>
          </svg>
        </div>
      </section>
    </>
  );
}