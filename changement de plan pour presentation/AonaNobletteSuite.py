'''
 Aperçu Général (Overview)
- **Objectif** : Créer une plateforme web pour Spray Info Formation, un centre de formation professionnelle à Madagascar, offrant des cours présentielles (développement web, réseaux, cybersécurité, DevOps). Le site permet aux étudiants de consulter les formations, s'inscrire via un panier, et payer en ligne (Mvola ou compte Spray Info) ou en espèces sur place.
- **Slogan** : "Behind every success, there is sacrifice" (Partenaire pour la formation présentielle).
- **Fonctionnalités Clés** :
  - Consultation des formations disponibles (nom, description, prix, lieu, dates).
  - Inscription via un panier virtuel.
  - Paiement en ligne (Mvola, compte Spray Info) ou option "Payer en espèces sur place".
  - Gestion par les administrateurs (ajout/modification/suppression des formations).
- **Technologies** :
  - Frontend : React (avec React Router, Context API, Tailwind CSS).
  - Backend : Flask (Python) pour les API RESTful.
  - Base de Données : MySQL pour stocker utilisateurs, formations, inscriptions.
  - Sécurité : JWT pour l'authentification, HTTPS.

---
'''

'''

## ✅ 3️⃣ Sur la structure frontend, voici **où on en est** (avec ✅ / ⏳ / ❌)

```plaintext
src/
├── components/
│   ├── Navbar.js              ✅ Terminé
│   ├── Footer.js              ✅ Terminé
│   ├── CardFormations.js      ✅ Fonctionnel (avec Toast)
│   ├── Sidebar.js             ❌ À faire
├── pages/
│   ├── Home.js                ❌ À faire
│   ├── Login.js               ✅ Terminé
│   ├── Register.js            ❌ À faire
│   ├── Formations.js          ✅ Terminé
│   ├── Cart.js                ⏳ Fonctionnel 
│   ├── Checkout.js            ❌ À faire
│   ├── Admin.js               ❌ À faire
├── services/
│   ├── userService.js         ⏳ Basique (à connecter à backend)
│   ├── formationService.js    ✅ Mocks
│   ├── paymentService.js      ❌ À faire
│   ├── orderService.js        ❌ À faire
├── context/
│   ├── AuthContext.js         ❌ À faire
│   ├── CartContext.js         ✅ Fonctionnel
├── assets/
│   ├── images/                ⏳ En cours
│   ├── styles/                ⏳ En cours
├── App.js                     ⏳ Partiellement fait
├── index.js                   ✅ Terminé
'''