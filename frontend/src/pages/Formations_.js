import React, { useEffect, useState } from 'react';
import CardFormations from '../components/CardFormations';
import { getFormations } from '../services/formationService';

// Définir la couleur de marque secondaire (Bleu foncé)
const secondaryColor = '#314482'; // Couleur principale pour les titres importants
const primaryBrandColor = '#007BFF'; // Le bleu vif de votre navbar

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const data = await getFormations();
        setFormations(data);
      } catch (error) {
        console.error('Error fetching formations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFormations();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg text-gray-700">Loading formations...</p>;

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen"> {/* Augmentation py-12 */}
      
      {/* En-tête de la page */}
      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800"> {/* Titre en gris foncé */}
        Our Available Courses
      </h1>
      <p className="text-center text-lg text-gray-500 mb-12 max-w-3xl mx-auto"> {/* Description en gris plus clair */}
        Explore our curated selection of professional training programs designed to elevate your tech skills and career.
      </p>

      {/* Grille de Formations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> 
        {formations.map((formation) => (
          <CardFormations key={formation.id} formation={formation} />
        ))}
      </div>
      
      {/* Espace vide si les formations sont peu nombreuses */}
      {formations.length < 6 && <div className="h-20 md:h-40"></div>} 

    </div>
  );
};

export default Formations;