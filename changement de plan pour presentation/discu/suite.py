'''
D'accord, maintenant que `Navbar.js`, `Footer.js`, et `Login.js` sont en place et fonctionnels d'après votre capture d'écran, passons à la suite. Nous allons commencer par développer `Formations.js`, car c'est une page clé pour afficher les cours proposés par Spray Info Formation. Cette page utilisera des données simulées via `formationService.js` pour l'instant, et nous intégrerons `CardFormations.js` pour afficher chaque formation de manière visuelle.

### Explication en Français
- **Objectif** : `Formations.js` va lister les formations disponibles (ex. Dev-PRO 3.0, Réseaux Essentials) en utilisant des cartes générées par `CardFormations.js`. Les données seront récupérées via une fonction mock dans `formationService.js`.
- **Approche** : Nous utiliserons React pour afficher une liste dynamique. Pour l'instant, les données sont statiques (mocks), mais elles seront remplacées par des appels API une fois le backend Flask prêt.
- **Prochaines étapes** : Après `Formations.js`, nous pourrons passer à `Cart.js` pour gérer les inscriptions sélectionnées.

### Code pour Formations.js
Voici une version de base pour `Formations.js` :

<xaiArtifact artifact_id="653796cc-0016-40c7-a0ff-56e9fb31c1e9" artifact_version_id="ccc166fc-4af3-4a72-a59b-2ded149d7606" title="Formations.js" contentType="text/javascript">

import React, { useEffect, useState } from 'react';
import CardFormations from '../components/CardFormations';
import { getFormations } from '../services/formationService';

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Formations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formations.map((formation) => (
          <CardFormations key={formation.id} formation={formation} />
        ))}
      </div>
    </div>
  );
};

export default Formations;

</xaiArtifact>

### Code pour CardFormations.js
Ce composant affichera chaque formation avec son nom, description, prix, et un bouton pour s'inscrire (lié au panier plus tard).

<xaiArtifact artifact_id="2f4e372f-84c5-4a29-b62f-d1affc281717" artifact_version_id="717f9923-f09c-460e-bae2-37ad399b9449" title="CardFormations.js" contentType="text/javascript">

import React from 'react';

const CardFormations = ({ formation }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold">{formation.name}</h3>
      <p className="text-gray-600">{formation.description}</p>
      <p className="text-gray-800 font-bold">Price: ${formation.price} Ar</p>
      <button className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Register
      </button>
    </div>
  );
};

export default CardFormations;

</xaiArtifact>

### Code pour formationService.js
Ce fichier contient les données simulées pour les formations. Vous pouvez l'étendre plus tard avec des appels API.

<xaiArtifact artifact_id="69cb6c55-84c9-4589-bc7a-4f72b8ac5fb0" artifact_version_id="4192a8d1-d5b8-424d-ab15-3267e54449ca" title="formationService.js" contentType="text/javascript">

export const getFormations = async () => {
  return [
    { id: 1, name: 'Dev-PRO 3.0', price: 500000, description: 'Comprehensive web development training with certificate and internship.' },
    { id: 2, name: 'Network Essentials', price: 300000, description: 'Basics of networking including TCP/IP and router configuration.' },
    { id: 3, name: 'Cybersecurity Pro', price: 400000, description: 'Data protection and ethical hacking fundamentals.' },
    { id: 4, name: 'DevOps Mastery', price: 350000, description: 'Learn Docker, Kubernetes, and CI/CD tools.' },
  ];
};

</xaiArtifact>

### Intégration dans App.js
Assurez-vous que la route pour `Formations` est définie dans `App.js` :

```jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Formations from './pages/Formations';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/formations" element={<Formations />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
```

### Étapes Suivantes
1. **Testez** : Lancez l'application avec `npm start` et naviguez vers `/formations` pour voir la liste des formations.
2. **Styling** : Ajustez les classes Tailwind dans `CardFormations.js` si besoin (ex. changer la grille avec `md:grid-cols-2` pour 2 colonnes sur écrans moyens).
3. **Lien avec Cart** : Plus tard, connectez le bouton "Register" à `CartContext.js` pour ajouter des formations au panier.
4. **Prochaine Page** : Une fois `Formations.js` validé, passons à `Cart.js`.

Dites-moi si vous voulez que je développe une autre page ou que j'ajuste quelque chose !
'''