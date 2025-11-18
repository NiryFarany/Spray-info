'''
Parfait, maintenant que vous avez une structure frontend et backend bien définie, et que vous voulez relier le frontend au backend en commençant par le `formation-service`, je vais vous guider étape par étape. Comme vous êtes d'abord sur le `formation-service`, nous allons connecter le frontend (notamment `Formations.js` et `formationService.js`) aux endpoints du backend.

### Étape 1 : Vérifier que le `formation-service` est opérationnel
Assurez-vous que votre `formation-service` fonctionne correctement :
- Lancez le serveur avec `python run.py` dans `backend/formation-service/`.
- Vérifiez que les endpoints comme `http://localhost:5002/api/formations` (port 5002 comme défini) répondent correctement. Pour l'instant, avec `db.create_all()`, la table `Formation` devrait être créée, mais elle sera vide sauf si vous avez ajouté des données manuellement.

### Étape 2 : Mettre à jour `formationService.js`
Le fichier `src/services/formationService.js` utilise actuellement des mocks. Remplacez les mocks par des appels API vers `formation-service`. Voici un exemple mis à jour :

- Ouvre `src/services/formationService.js` et modifie-le comme suit :
```javascript
export const getFormations = async () => {
  try {
    const response = await fetch('http://localhost:5002/api/formations');
    if (!response.ok) throw new Error('Erreur lors de la récupération des formations');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

export const getFormationById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5002/api/formations/${id}`);
    if (!response.ok) throw new Error('Formation non trouvée');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
```
- **Explication** : Ces fonctions appellent les endpoints GET du `formation-service`. Assurez-vous que le port (5002) correspond à celui défini dans `run.py`.

### Étape 3 : Mettre à jour `Formations.js`
Le composant `src/pages/Formations.js` affiche la liste des formations. Puisqu'il est marqué comme "Terminé (mocks)", il utilise probablement des données simulées. Remplacez les mocks par les données récupérées via `formationService.js`. Voici un exemple mis à jour :

```javascript
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
        ))}
      </div>
    </div>
  );
};

export default Formations;
```
- **Explication** : 
  - `useEffect` récupère les formations au montage du composant.
  - Les données sont passées au composant `CardFormations`, qui doit être compatible avec la structure JSON renvoyée par `formation-service` (ex. `{id, name, description, price, location, dates}`).

### Étape 4 : Tester la connexion
- Lancez votre application React avec `npm start` (ou l'équivalent selon votre configuration).
- Assurez-vous que le `formation-service` est en cours d'exécution sur `http://localhost:5002`.
- Ouvrez `http://localhost:3000/formations` (ou la route correspondant à `Formations.js`) dans votre navigateur. Vous devriez voir la liste des formations si des données sont présentes dans la base de données, ou un message d'erreur si la connexion échoue.

### Étape 5 : Ajouter des données au backend (facultatif pour test)
Si la liste est vide, insérez des données dans `formation_db` via MySQL :
```sql
INSERT INTO formation (name, description, price, location, dates) VALUES 
('Dev-PRO 3.0', 'Formation web complète', 500000, 'Antananarivo', '2025-11-01'),
('Réseau PRO', 'Formation réseau', 300000, 'Tana', '2025-11-15');
```
Ou ajoutez une route POST dans `formation_routes.py` pour insérer des données via le frontend :
```python
from flask import Blueprint, jsonify, request
from app.models.formation import Formation
from app import db

bp = Blueprint('formation', __name__, url_prefix='/api/formations')

@bp.route('/', methods=['GET'])
def get_formations():
    formations = Formation.query.all()
    return jsonify([{'id': f.id, 'name': f.name, 'description': f.description, 'price': f.price, 'location': f.location, 'dates': f.dates} for f in formations])

@bp.route('/', methods=['POST'])
def add_formation():
    data = request.json
    new_formation = Formation(name=data['name'], description=data['description'], price=data['price'], location=data['location'], dates=data['dates'])
    db.session.add(new_formation)
    db.session.commit()
    return jsonify({'id': new_formation.id, 'name': new_formation.name}), 201
```

### Étape 6 : Planifier les autres services
Une fois que `formation-service` est connecté, vous pouvez :
- Répéter le processus pour `user-service` (connecter `Login.js` et `Register.js` à `http://localhost:5001/api/users`).
- Puis pour `order-service` et `payment-service` en fonction des besoins (`Cart.js`, `Checkout.js`).

### Prochaines étapes
Testez la connexion entre `Formations.js` et `formation-service`. Si vous rencontrez des erreurs (ex. CORS, données non chargées), dites-le-moi, et je vous aiderai à les résoudre. Voulez-vous ajouter la route POST ou passer à un autre service ?
'''