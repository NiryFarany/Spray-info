'''
Pour ajouter la fonctionnalité d'ajout de formation dans le frontend, destinée à être utilisée par un administrateur, nous allons créer une interface dans le composant `Admin.js` (marqué comme "À améliorer" dans votre structure frontend). Cette interface permettra à l'admin de soumettre un nouveau formulaire de formation qui sera envoyé au backend via le `formation-service`. Voici comment procéder étape par étape.

### Étape 1 : Mettre à jour `formationService.js`
Ajoutons une fonction pour envoyer une nouvelle formation au backend. Modifiez `src/services/formationService.js` pour inclure une méthode POST :

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

export const addFormation = async (formationData) => {
  try {
    const response = await fetch('http://localhost:5002/api/formations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formationData),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'ajout de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
```

- **Explication** : Cette fonction `addFormation` envoie une requête POST avec les données de la nouvelle formation au endpoint `/api/formations`.

### Étape 2 : Mettre à jour `formation_routes.py` (Backend)
Assurez-vous que le backend peut gérer cette requête POST. Modifiez `backend/formation-service/app/routes/formation_routes.py` comme suit (si ce n'est pas déjà fait) :

```python
from flask import Blueprint, jsonify, request
from app.models.formation import Formation
from app import db

bp = Blueprint('formation', __name__, url_prefix='/api/formations')

@bp.route('/', methods=['GET'])
def get_formations():
    formations = Formation.query.all()
    return jsonify([{'id': f.id, 'name': f.name, 'description': f.description, 'price': f.price, 'location': f.location, 'dates': f.dates} for f in formations])

@bp.route('/<int:id>', methods=['GET'])
def get_formation(id):
    formation = Formation.query.get_or_404(id)
    return jsonify({'id': formation.id, 'name': f.name, 'description': f.description, 'price': f.price, 'location': f.location, 'dates': f.dates})

@bp.route('/', methods=['POST'])
def add_formation():
    data = request.json
    new_formation = Formation(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        location=data['location'],
        dates=data['dates']
    )
    db.session.add(new_formation)
    db.session.commit()
    return jsonify({'id': new_formation.id, 'name': new_formation.name}), 201
```

- **Explication** : Cette route POST crée une nouvelle entrée dans la table `Formation` avec les données fournies.

### Étape 3 : Mettre à jour `Admin.js`
Modifiez `src/pages/Admin.js` pour inclure un formulaire permettant à l'admin d'ajouter une formation. Voici un exemple :

```javascript
import React, { useState } from 'react';
import { addFormation } from '../services/formationService';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    dates: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addFormation(formData);
      setMessage(`Formation ajoutée avec l'ID: ${result.id}`);
      setFormData({ name: '', description: '', price: '', location: '', dates: '' }); // Réinitialiser le formulaire
    } catch (error) {
      setMessage('Erreur lors de l\'ajout de la formation');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - Ajouter une Formation</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Prix (Ar)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Lieu</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Dates</label>
          <input
            type="text"
            name="dates"
            value={formData.dates}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            placeholder="ex. 2025-11-01"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Ajouter Formation
        </button>
      </form>
    </div>
  );
};

export default Admin;
```

- **Explication** :
  - Un formulaire avec des champs pour `name`, `description`, `price`, `location`, et `dates` est créé.
  - La fonction `handleSubmit` envoie les données via `addFormation`.
  - Un message de succès ou d'erreur est affiché après la soumission.

### Étape 4 : Tester la fonctionnalité
- Lancez le `formation-service` avec `python run.py` dans `backend/formation-service/`.
- Lancez le frontend avec `npm start`.
- Connectez-vous en tant qu'admin (si une authentification est prévue, ajoutez-la via `AuthContext.js` plus tard) et accédez à la route `/admin`.
- Remplissez le formulaire avec des données (ex. Nom: "Nouveau Cours", Prix: 400000, etc.) et soumettez. Vérifiez que la formation apparaît dans la base de données via MySQL ou en rafraîchissant `/formations`.

### Étape 5 : Sécuriser l'accès admin (optionnel)
- Pour limiter cette fonctionnalité aux admins, intégrez une authentification via `AuthContext.js`. Ajoutez une vérification dans `Admin.js` pour rediriger les utilisateurs non autorisés.

### Prochaines étapes
Testez cette fonctionnalité. Si vous rencontrez des erreurs (ex. CORS, erreurs 500), partagez-les avec moi. Voulez-vous ajouter l'authentification admin ou passer à un autre service (ex. `user-service`) ?
'''

#nety ihany ka,
#ty no erreur:  const response = await fetch('http://localhost:5002/api/formations', {
#au lieu de  const response = await fetch('http://localhost:5002/api/formations/', {
#io / io eh