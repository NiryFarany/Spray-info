import React, { useState, useEffect } from 'react';
import { getFormations } from '../services/formationService';
import CardFormations from '../components/CardFormations';

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const data = await getFormations();
        setFormations(data);
      } catch (error) {
        console.error('Erreur lors du chargement des formations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFormations();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Our Available Courses</h1>
      <p className="mb-6">Explore our curated selection of professional training programs designed to elevate your tech skills and career.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {formations.map((formation) => (
          
          <CardFormations key={formation.id} formation={formation} />
          //non zah sur fa juste le probleme core tany @ backend no probleme teto
        ))}


        
      </div>
    </div>
  );
};

export default Formations;