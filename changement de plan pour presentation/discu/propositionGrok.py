'''
### Changement de Projet : De Shop Nirina à Spray Info Formations

D'accord, on va transformer ton e-commerce de produits généraux (comme vêtements ou électronique) en une plateforme pour Spray Info, un centre de formation professionnel en informatique à Madagascar. L'idée est de vendre des inscriptions à des formations, certifications, stages et peut-être des ressources associées (comme des e-books ou kits d'apprentissage). Ça reste un "shop" mais orienté services éducatifs, avec un thème bleu dominant inspiré du logo et de l'affiche Dev-PRO 3.0 que tu as partagée.

On garde la structure frontend React actuelle (composants, pages, services, contexts) pour ne pas tout recommencer, mais on l'adapte au nouveau contexte. Les mocks suffiront pour l'instant ; on passera aux API réelles avec Flask et MySQL plus tard. Le slogan "Vos envies en un seul clic" peut devenir "Vos formations en un clic" pour coller au thème éducatif.

#### Recommandations pour les "Produits" (Formations et Services)
Au lieu de produits physiques, tes "produits" seront des offres éducatives. Basé sur l'affiche et le focus de Spray Info (développement, réseau, cybersécurité, DevOps), voici des idées concrètes et réalistes pour un centre à Madagascar :
- **Catégories principales** (à afficher dans Sidebar.js) :
  - Développement Web & Logiciel
  - Réseaux Informatiques
  - Cybersécurité
  - DevOps & Cloud
  - Autres (AI, Data Science, Bureautique Avancée)

- **Exemples de produits (formations)** :
  - **Dev-PRO 3.0** : Formation complète en développement web (HTML, CSS, JavaScript, React, Express, Symfony, PostgreSQL, MySQL). Durée : 3 mois. Mode : Présentiel + en ligne. Prix : 500 000 Ar. Inclut certificat et stage.
  - **Réseaux Essentials** : Cours sur les bases des réseaux (TCP/IP, configuration routeurs, VLAN). Durée : 1 mois. Prix : 300 000 Ar. Certificat inclus.
  - **Cybersécurité Pro** : Formation sur la protection des données, ethical hacking, firewalls. Durée : 2 mois. Prix : 400 000 Ar. Avec simulations pratiques.
  - **DevOps Mastery** : Outils comme Docker, Kubernetes, CI/CD. Durée : 6 semaines. Prix : 350 000 Ar. Orienté cloud (AWS/Azure).
  - **Pack Complet IT** : Bundle de 2 formations (ex. Dev + Réseaux). Prix : 700 000 Ar (réduction incluse).
  - **Ressources Supplémentaires** : E-book "Introduction à la Cybersécurité" (50 000 Ar), Kit d'apprentissage DevOps (outils virtuels, 100 000 Ar).

- **Attributs pour chaque produit** (à ajouter dans les mocks) :
  - Nom, description détaillée, prix en Ariary (Ar), durée, mode (en ligne/présentiel/hybride), prérequis (ex. bases en programmation), image (utilise des placeholders bleus ou des icônes IT).
  - Ajoute un bouton "S'inscrire" au lieu de "Ajouter au panier" pour coller au thème éducatif, mais garde la logique du panier pour permettre d'ajouter plusieurs formations.

- **Conseils généraux** :
  - **Prix** : Adapts-les au marché malgache (abordables, en Ar). Ajoute des promotions pour étudiants ou groupes.
  - **Images** : Utilise des visuels éducatifs (ex. icônes de code, réseaux, locks pour cybersécurité). Stocke-les dans assets/images/.
  - **Devises et Localisation** : Garde l'Ariary ; ajoute des options pour paiements mobiles (Mvola, Orange Money) dans Checkout plus tard.
  - **Nombre de produits** : Commence avec 5-10 mocks pour tester, puis étends.
  - **Différences avec l'ancien shop** : Moins d'emphase sur le stock (illimité pour formations), plus sur les dates de sessions ou disponibilités.

#### Étapes pour Adapter le Frontend React
On suit ta liste "Ce qui a été fini" et "À faire", mais avec les changements. Je te donne des exemples de code pour les parties clés. Assume que tu utilises Tailwind ou CSS basique ; si besoin, passe à du bleu (#007BFF pour principal, #E0F7FA pour fond).

1. **Mettre à Jour le Thème Global (Couleurs et Nom)**
   - Dans `styles/` (ou tailwind.config.js si tu l'utilises) : Remplace le rose (#FF69B4) par du bleu (#007BFF).
     Exemple CSS global (dans un fichier comme global.css) :
     ```css
     :root {
       --primary-color: #007BFF; /* Bleu Spray Info */
       --secondary-color: #E0F7FA; /* Bleu clair pour fonds */
       --text-color: #333;
     }
     body { background-color: var(--secondary-color); }
     .navbar { background-color: var(--primary-color); color: white; }
     ```
   - Dans `App.js` : Change le titre et importe le CSS.
     ```jsx
     import './styles/global.css'; // Ou ton fichier CSS

     function App() {
       return (
         <div className="App">
           <Navbar title="Spray Info Formations" slogan="Vos formations en un clic" />
           {/* Routes existantes */}
           <Footer />
         </div>
       );
     }
     ```

2. **Adapter Navbar.js et Footer.js**
   - Navbar : Change le nom, garde les liens mais adapte (ex. "Products" → "Formations").
     ```jsx
     // Navbar.js
     const Navbar = ({ title, slogan }) => {
       return (
         <nav className="bg-primary-color p-4">
           <h1>{title} - {slogan}</h1>
           <ul>
             <li><Link to="/">Accueil</Link></li>
             <li><Link to="/formations">Formations</Link></li> {/* Changé de /products */}
             <li><Link to="/panier">Panier</Link></li>
             <li><Link to="/paiement">Paiement</Link></li>
             <li><Link to="/login">Connexion</Link></li>
             <li><Link to="/register">Inscription</Link></li>
             <li><Link to="/admin">Admin</Link></li>
           </ul>
         </nav>
       );
     };
     ```
   - Footer : Ajoute contact Spray Info (du l'affiche : +261 38 79 30 53, www.sprayinfo.com).
     ```jsx
     // Footer.js
     const Footer = () => {
       return (
         <footer className="bg-primary-color p-4 text-white fixed bottom-0 w-full">
           <p>© 2025 Spray Info. Tous droits réservés.</p>
           <p>Contact : +261 38 79 30 53 | www.sprayinfo.com</p>
         </footer>
       );
     };
     ```
     **Fix positionnement** : Si le footer n'est pas fixed, ajoute `position: fixed; bottom: 0;` dans CSS.

3. **Adapter Sidebar.js (Catégories)**
   - Remplace les catégories par celles recommandées.
     ```jsx
     // Sidebar.js
     const Sidebar = () => {
       const categories = ['Développement Web', 'Réseaux', 'Cybersécurité', 'DevOps', 'Autres'];
       return (
         <aside className="bg-secondary-color p-4">
           <h3>Catégories</h3>
           <ul>{categories.map(cat => <li key={cat}>{cat}</li>)}</ul>
         </aside>
       );
     };
     ```

4. **Adapter Products.js et CardProduits.js (Maintenant "Formations")**
   - Change la route en `/formations` dans App.js.
   - Dans `produitService.js` : Remplace les mocks.
     ```jsx
     // produitService.js (mocks pour l'instant)
     export const getProducts = async () => {
       return [
         { id: 1, name: 'Dev-PRO 3.0', price: 500000, category: 'Développement Web', description: 'Formation complète avec certificat et stage.', image: '/assets/dev-pro.jpg' },
         { id: 2, name: 'Réseaux Essentials', price: 300000, category: 'Réseaux', description: 'Bases des réseaux informatiques.', image: '/assets/reseaux.jpg' },
         // Ajoute les autres...
       ];
     };
     ```
   - CardProduits.js : Adapte pour afficher description, durée, etc.
     ```jsx
     // CardProduits.js
     const CardProduit = ({ product }) => {
       return (
         <div className="bg-white p-4 shadow-md">
           <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
           <h3>{product.name}</h3>
           <p>{product.description}</p>
           <p>Prix : {product.price} Ar</p>
           <button className="bg-primary-color text-white">S'inscrire</button> {/* Lie à addToCart */}
         </div>
       );
     };
     ```
   - Products.js : Utilise getProducts pour afficher la liste.

5. **Continuer les Étapes "À Faire" avec Adaptations**
   - **ÉTAPE 1 : Passer des produits réels** : Fait avec les nouveaux mocks ci-dessus. Ajoute gestion d'erreurs dans Products.js (ex. useEffect avec try/catch).
   - **ÉTAPE 2 : Cart.js** : Utilise CartContext pour ajouter des formations. Ajoute fonctions comme addToCart(product) dans CartContext.js. Affiche total en Ar.
   - **ÉTAPE 3 : Login/Register** : Adapts pour utilisateurs (étudiants/instructeurs). Utilise AuthContext pour stocker rôle (ex. admin pour gérer formations).
   - **ÉTAPE 4 : Admin.js** : Interface pour ajouter/modifier/supprimer formations (formulaires avec champs comme nom, prix, catégorie).
   - **ÉTAPE 5 : Checkout + Paiement + Orders** : Adapte pour "Inscription et Paiement". Utilise paymentService pour simuler (ex. statut "Inscrit"). Ajoute une page Orders.js pour historique des inscriptions.

#### Prochaines Étapes Globales
- **Teste localement** : Lance `npm start` et vérifie les pages. Corrige les routes si Checkout n'apparaît pas (assure-toi que <Route path="/checkout" component={Checkout} /> est dans App.js).
- **Images et Assets** : Ajoute des placeholders bleus dans assets/ (ex. utilise des outils gratuits pour générer icônes IT).
- **Transition au Backend** : Une fois frontend stable, on connectera les services à Flask (ex. API /api/formations pour getProducts). Les DB microservices restent valides : user_service pour inscriptions, product_service pour formations, etc.
- **Améliorations** : Ajoute filtres par catégorie dans Sidebar, recherche, ou témoignages d'étudiants.

Si tu partages du code spécifique (ex. un fichier), je peux le corriger directement. On avance étape par étape !
'''