'''
Pour permettre à l'admin de modifier et supprimer des formations dans le frontend via le composant `Admin.js`, nous allons ajouter les fonctionnalités correspondantes en mettant à jour à la fois le backend (`formation-service`) et le frontend. Voici les étapes détaillées :

### Étape 1 : Mettre à jour `formation_routes.py` (Backend)
Ajoutons les routes PUT (pour la modification) et DELETE (pour la suppression) dans `backend/formation-service/app/routes/formation_routes.py`. Assurez-vous que CORS est toujours activé comme précédemment :

```python
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from app.models.formation import Formation
from app import db

bp = Blueprint('formation', __name__, url_prefix='/api/formations')
CORS(bp, resources={r"/api/*": {"origins": "http://localhost:3000"}})

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

@bp.route('/<int:id>', methods=['PUT'])
def update_formation(id):
    formation = Formation.query.get_or_404(id)
    data = request.json
    formation.name = data.get('name', formation.name)
    formation.description = data.get('description', formation.description)
    formation.price = data.get('price', formation.price)
    formation.location = data.get('location', formation.location)
    formation.dates = data.get('dates', formation.dates)
    db.session.commit()
    return jsonify({'id': formation.id, 'name': formation.name}), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete_formation(id):
    formation = Formation.query.get_or_404(id)
    db.session.delete(formation)
    db.session.commit()
    return jsonify({'message': 'Formation supprimée avec succès'}), 200
```

- **Explication** :
  - `@bp.route('/<int:id>', methods=['PUT'])` : Met à jour une formation existante avec les nouvelles données fournies.
  - `@bp.route('/<int:id>', methods=['DELETE'])` : Supprime une formation en fonction de son `id`.
  - `get_or_404` renvoie une erreur 404 si la formation n'est pas trouvée.

### Étape 2 : Mettre à jour `formationService.js` (Frontend)
Ajoutons les fonctions pour modifier et supprimer une formation dans `src/services/formationService.js` :

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

export const updateFormation = async (id, formationData) => {
  try {
    const response = await fetch(`http://localhost:5002/api/formations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formationData),
    });
    if (!response.ok) throw new Error('Erreur lors de la modification de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

export const deleteFormation = async (id) => {
  try {
    const response = await fetch(`http://localhost:5002/api/formations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
```

- **Explication** : Ajout de `updateFormation` et `deleteFormation` pour interagir avec les nouvelles routes PUT et DELETE.

### Étape 3 : Mettre à jour `Admin.js` (Frontend)
Modifions `src/pages/Admin.js` pour inclure la liste des formations existantes, ainsi que des boutons pour modifier et supprimer. Voici le code mis à jour :

```javascript
import React, { useState, useEffect } from 'react';
import { getFormations, addFormation, updateFormation, deleteFormation } from '../services/formationService';
import { toast } from 'react-toastify';

const Admin = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    location: '',
    dates: '',
  });
  const [formations, setFormations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const data = await getFormations();
      setFormations(data);
    } catch (error) {
      setMessage('Erreur lors du chargement des formations');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateFormation(formData.id, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          location: formData.location,
          dates: formData.dates,
        });
        setMessage('Formation modifiée avec succès');
      } else {
        const result = await addFormation({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          location: formData.location,
          dates: formData.dates,
        });
        setMessage(`Formation ajoutée avec l'ID: ${result.id}`);
      }
      setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' });
      fetchFormations(); // Rafraîchir la liste
    } catch (error) {
      setMessage('Erreur lors de l\'ajout ou de la modification');
    }
  };

  const handleEdit = (formation) => {
    setFormData(formation);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await deleteFormation(id);
        setMessage('Formation supprimée avec succès');
        fetchFormations(); // Rafraîchir la liste
      } catch (error) {
        setMessage('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - Gérer les Formations</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="max-w-md space-y-4 mb-6">
        <input
          type="hidden"
          name="id"
          value={formData.id || ''}
          onChange={handleChange}
        />
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
          {formData.id ? 'Modifier Formation' : 'Ajouter Formation'}
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4">Liste des Formations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formations.map((formation) => (
          <div key={formation.id} className="border p-4 rounded-md flex justify-between items-center">
            <span>{formation.name}</span>
            <div>
              <button
                onClick={() => handleEdit(formation)}
                className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(formation.id)}
                className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
```

- **Explication** :
  - **Liste des formations** : Affiche toutes les formations récupérées avec des boutons "Modifier" et "Supprimer".
  - **Mode édition** : Clique sur "Modifier" remplit le formulaire avec les données de la formation sélectionnée.
  - **Suppression** : Clique sur "Supprimer" ouvre une confirmation et supprime la formation.
  - **Soumission** : Le bouton "Ajouter Formation" devient "Modifier Formation" en mode édition, et les actions sont différenciées par la présence de `formData.id`.

### Étape 4 : Tester
- Lancez le `formation-service` avec `python run.py`.
- Lancez le frontend avec `npm start`.
- Accédez à `/admin`, ajoutez une formation, puis testez la modification et la suppression.
- Vérifiez les changements dans la base de données via MySQL ou en rafraîchissant la liste.

### Problèmes potentiels
- **CORS** : Si des erreurs persistent, assurez-vous que CORS est bien configuré.
- **Authentification** : Ajoutez une vérification d'admin via `AuthContext.js` si nécessaire.

### Prochaines étapes
Testez ces fonctionnalités. Si vous rencontrez des erreurs, partagez-les. Voulez-vous ajouter l'authentification admin ou passer à un autre service ?
'''