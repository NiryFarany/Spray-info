import { Link } from "react-router-dom";
import { ArrowRightIcon, LocationMarkerIcon, AcademicCapIcon, PhoneIcon } from "@heroicons/react/outline";
import sprayInfoWhite from '../assets/images/sprayInfo.jpeg'; // Assurez-vous que c'est le logo blanc sur transparent

export default function Home() {
  return (
    <>
      {/* Modification du dégradé pour rester dans les tons de bleu */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-900 text-white flex items-center justify-center px-6 overflow-hidden">
        
        {/* Fond logo très subtil pour la texture */}
        {/* Opacité et filtre ajustés pour le rendre plus visible */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"> 
          <img
            src={sprayInfoWhite}   
            alt="Spray Info Formation Background"
            className="w-full h-full object-cover object-center scale-150 filter blur-lg" 
            onError={(e) => {
              e.target.style.display = 'none';
              console.log("Logo fond non trouvé → vérifie le chemin.");
            }}
          />
        </div>

        {/* Overlay sombre - Opacité réduite pour laisser passer le logo de fond */}
        <div className="absolute inset-0 bg-black/40"></div> 

        {/* Contenu principal */}
        <div className="relative text-center max-w-4xl mx-auto space-y-7 md:space-y-8 z-10 py-16"> 

          {/* Logo principal en haut - Plus grand et Arrondi */}
          <img
            src={sprayInfoWhite} 
            alt="Spray Info Formation Logo"
            className="h-24 md:h-28 mx-auto mb-4 drop-shadow-xl rounded-full" // Ajout de rounded-full et augmentation de la taille (h-24/h-28)
            onError={(e) => e.target.src = ''} 
          />

          {/* Titre - Taille ajustée pour ne pas être trop grande (lg:text-7xl -> lg:text-6xl) */}
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight">
            Devenez un <span className="text-cyan-300">Expert IT</span><br />
            à <span className="text-cyan-200">Fianarantsoa</span>
          </h1>

          <p className="text-lg md:text-xl font-medium opacity-95 max-w-3xl mx-auto leading-relaxed pt-4">
            Formations intensives <strong className="text-white">100% en présentiel</strong><br /> 
            <span className="text-cyan-300">Réseau • Développement • DevOps • Data Science</span><br />
            Accompagnement jusqu’à l’emploi inclus
          </p>

          {/* Icônes */}
          <div className="flex justify-center gap-8 md:gap-14 py-8 text-cyan-400"> 
            <div className="flex flex-col items-center">
              <LocationMarkerIcon className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-xs md:text-sm mt-1">Fianarantsoa</span>
            </div>
            <div className="flex flex-col items-center">
              <AcademicCapIcon className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-xs md:text-sm mt-1">Certificat officiel</span>
            </div>
            <div className="flex flex-col items-center">
              <PhoneIcon className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-xs md:text-sm mt-1">Paiement MVola</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4">
            <Link
              to="/formations"
              className="bg-cyan-500 hover:bg-cyan-400 text-blue-900 font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-3 justify-center"
            >
              Voir les formations
              <ArrowRightIcon className="h-6 w-6" />
            </Link>

            <a
              href="https://wa.me/261383793053?text=Salama!%20Te%20hiresaka%20momba%20ny%20formation%20ao%20aminny%20Spray%20Info"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-800 font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center" 
            >
              Contact WhatsApp
            </a>
          </div>

          <p className="text-sm md:text-base opacity-70 pt-8">
            Quartier Imandry • Fianarantsoa • <strong className="text-cyan-200">+261 38 37 930 53</strong>
          </p>
        </div>

        {/* Vague finale */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            {/* Couleur ajustée pour un bleu très très clair (#F0FFFF) pour une meilleure transition */}
            <path d="M0 100L60 80L120 90L180 70L240 85L300 65L360 80L420 60L480 75L540 55L600 70L660anke50L720 65L780 45L840 60L900 40L960 55L1020 35L1080 50L1140 30L1200 45L1260 25L1320 40L1380 20L1440 35V100H0Z" fill="#F0FFFF"/> 
          </svg>
        </div>
      </section>
    </>
  );
}