// src/pages/Home.js → VERSION 2025 SPRAY INFO (LA PLUS BELLE DE MADAGASCAR)

import { useEffect, useState } from "react";
import { getFormations } from "../services/formationService";
import { Link } from "react-router-dom";
//import { ArrowRightIcon, AcademicCapIcon, CodeBracketIcon, ShieldCheckIcon, CpuChipIcon } from "@heroicons/react/outline";//from '@heroicons/react/solid';
//tsy mety ty from "@heroicons/react/24/outline"; ty
import { ArrowRightIcon, AcademicCapIcon, CodeIcon, ShieldCheckIcon, ChipIcon } from "@heroicons/react/outline";

export default function Home() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFormations();
        setFormations(data);
      } catch (err) {
        console.error("Erreur chargement formations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* HERO SECTION — LA STAR DU SITE */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
           <div className="absolute inset-0 bg-blue-900/20"></div>

        
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Devenez un <span className="text-cyan-300">Expert IT</span> à Fianarantsoa
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-4xl mx-auto">
            Formations intensives en présentiel — Réseau, Développement, DevOps, Data — 
            avec des formateurs passionnés et un suivi jusqu’à l’emploi.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/formations"
              className="bg-cyan-500 hover:bg-cyan-400 text-blue-900 font-bold text-xl py-5 px-12 rounded-full shadow-2xl transition transform hover:scale-105 inline-flex items-center justify-center"
            >
              Voir toutes les formations
              <ArrowRightIcon className="h-7 w-7 ml-3" />
            </Link>
            <a
              href="https://wa.me/261383793053"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-800 font-bold text-xl py-5 px-12 rounded-full shadow-2xl transition hover:bg-gray-100 inline-flex items-center justify-center"
            >
              Contact WhatsApp
            </a>
          </div>
        </div>

        {/* Vague douce en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 15L120 0L180 30L240 15L300 0L360 30L420 0L480 15L540 0L600 30L660 15L720 0L780 30L840 0L900 15L960 0L1020 30L1080 15L1140 0L1200 30L1260 0L1320 15L1380 0L1440 30V120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* NOS FORMATIONS — CARTES MAGNIFIQUES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Nos Formations Professionnelles
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choisissez votre voie parmi nos  programmes intensifs de 3  mois
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-2xl h-16 w-16 border-8 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {formations.map((formation) => (
                <div
                  key={formation.id}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                      {formation.name.includes("Réseau") && <ShieldCheckIcon className="h-12 w-12 text-blue-700" />}
                      {formation.name.includes("Dev") && <CodeIcon className="h-12 w-12 text-blue-700" />}
                      {formation.name.includes("DevOps") && <ChipIcon className="h-12 w-12 text-blue-700" />}
                      {formation.name.includes("data") && <AcademicCapIcon className="h-12 w-12 text-blue-700" />}
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-3">{formation.name}</h3>
                    <p className="text-gray-600 text-sm mb-6 h-12">
                      {formation.description || "Formation intensive en présentiel"}
                    </p>
                    <div className="text-3xl font-bold text-blue-800 mb-6">
                      {formation.price.toLocaleString()} Ar
                    </div>
                    <Link
                      to={`/formation/${formation.id}`}
                      className="block bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition transform hover:scale-105"
                    >
                      Voir les détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION AVANTAGES RAPIDES */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            Pourquoi choisir Spray Info ?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl mb-6">Presentiel</div>
              <h3 className="text-2xl font-bold mb-4">100% Présentiel</h3>
              <p className="text-blue-200">À Fianarantsoa, avec vrai tableau, vrai formateur, vraie ambiance</p>
            </div>
            <div>
              <div className="text-6xl mb-6">Emploi</div>
              <h3 className="text-2xl font-bold mb-4">Accompagnement Emploi</h3>
              <p className="text-blue-200">CV, entretiens, mise en relation avec entreprises</p>
            </div>
            <div>
              <div className="text-6xl mb-6">Certifie</div>
              <h3 className="text-2xl font-bold mb-4">Certificat Reconnu</h3>
              <p className="text-blue-200">Attestation officielle à la fin de chaque formation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Prêt à changer votre vie ?
          </h2>
          <p className="text-2xl mb-12 opacity-90">
            Inscrivez-vous dès aujourd’hui et rejoignez la prochaine promotion
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/formations"
              className="bg-white text-blue-800 font-bold text-2xl py-6 px-16 rounded-full shadow-2xl hover:bg-gray-100 transition transform hover:scale-105"
            >
              Choisir ma formation
            </Link>
            <a
              href="https://wa.me/261383793053?text=Salama!%20Je%20veux%20plus%20d'infos%20sur%20les%20formations%20Spray%20Info"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-4 border-white text-white font-bold text-2xl py-6 px-16 rounded-full hover:bg-white hover:text-blue-800 transition"
            >
              WhatsApp +261 38 37 930 53
            </a>
          </div>
        </div>
      </section>
    </>
  );
}