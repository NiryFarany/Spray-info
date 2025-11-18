'''
D'accord, je vais décrire en détail les schémas (diagrammes) UML nécessaires pour la conception de votre plateforme Spray Info Formation, en tenant compte des exigences que vous avez précisées (formations présentielles, paiements via Mvola/compte Spray Info ou en espèces, etc.). Comme je ne peux pas dessiner directement les diagrammes ici, je vais fournir une description textuelle précise pour chaque diagramme (Use Case Diagram, Class Diagram, Sequence Diagram) afin que vous puissiez les créer avec un outil comme Lucidchart, Draw.io, ou Visual Paradigm. Je vais aussi inclure des exemples visuels génériques via des images de référence pour vous guider.

---

### 1. Diagramme de Cas d'Utilisation (Use Case Diagram)
#### Description
Ce diagramme montre les interactions entre les acteurs et les fonctionnalités du système.
- **Acteurs** :
  - **Étudiant (User)** : Utilisateur final qui consulte les formations, s'inscrit, et paie.
  - **Administrateur (Admin)** : Gère les formations et les inscriptions.
- **Cas d'Utilisation** :
  - **Browse Formations** : L'étudiant consulte la liste des formations présentielles (nom, description, prix, lieu, dates).
  - **Add to Cart** : L'étudiant ajoute une formation au panier.
  - **Checkout** : L'étudiant choisit un mode de paiement (Mvola, compte Spray Info, ou en espèces) et finalise l'inscription.
  - **View History** : L'étudiant consulte son historique d'inscriptions.
  - **Login** : L'étudiant se connecte au système.
  - **Register** : L'étudiant crée un compte.
  - **Manage Formations** : L'admin ajoute, modifie ou supprime des formations.
  - **Approve Registrations** : L'admin valide les inscriptions (surtout pour celles payées en espèces).
  - **Manage Users** : L'admin gère les comptes utilisateurs (ex. bloquer/débloquer).
- **Relations** :
  - "Browse Formations" inclut "Add to Cart".
  - "Checkout" dépend de "Add to Cart".
  - "Manage Formations" et "Approve Registrations" sont spécifiques à "Admin".
- **Description Visuelle** :
  - Deux bâtons (stick figures) pour "User" et "Admin".
  - Ovales pour chaque cas d'utilisation, reliés aux acteurs par des lignes.
  - Lignes d'inclusion (ex. <<include>> de "Browse Formations" à "Add to Cart").
  - Exemple : "User" connecté à "Login", "Register", "Browse Formations", etc.

#### Référence Visuelle


---

### 2. Diagramme de Classes (Class Diagram)
#### Description
Ce diagramme représente les entités du système, leurs attributs, méthodes, et relations.
- **Classes** :
  - **User** :
    - Attributs : id (int, PK), name (varchar), email (varchar, unique), password_hash (varchar), role (enum: student/admin).
    - Méthodes : login(), register().
  - **Formation** :
    - Attributs : id (int, PK), name (varchar), description (text), price (decimal), location (varchar), start_date (date), end_date (date), capacity (int).
    - Méthodes : getDetails(), updateCapacity().
  - **Registration** :
    - Attributs : id (int, PK), user_id (int, FK -> User.id), formation_id (int, FK -> Formation.id), status (enum: pending/approved/paid/cash), payment_method (enum: mvola/spray_info/cash), registration_date (date).
    - Méthodes : updateStatus(), getStatus().
  - **Payment** :
    - Attributs : id (int, PK), registration_id (int, FK -> Registration.id), amount (decimal), method (enum: mvola/spray_info/cash), transaction_id (varchar), date (date).
    - Méthodes : processPayment(), getTransactionDetails().
- **Relations** :
  - **User** 1-* **Registration** : Un utilisateur peut avoir plusieurs inscriptions.
  - **Formation** 1-* **Registration** : Une formation peut avoir plusieurs inscriptions.
  - **Registration** 1-1 **Payment** : Une inscription peut avoir un paiement (optionnel si "cash").
  - Multiplicité : 1 (un côté) à * (plusieurs côté).
- **Description Visuelle** :
  - Boîtes rectangulaires pour chaque classe, avec trois sections : nom, attributs, méthodes.
  - Flèches avec multiplicité (ex. 1..* de User à Registration).
  - Exemple : "User" avec flèche vers "Registration", "Formation" avec flèche vers "Registration".

#### Référence Visuelle


---

### 3. Diagramme de Séquence (Sequence Diagram)
#### Description
Ce diagramme illustre le flux d'interactions pour un cas spécifique, ici le processus de "Checkout" (paiement d'une inscription).
- **Acteurs et Objets** :
  - **User** : L'étudiant qui finalise l'inscription.
  - **Frontend** : Interface React.
  - **Backend** : API Flask.
  - **Database** : MySQL.
  - **Payment Gateway** : Simulateur pour Mvola/Spray Info (ou placeholder pour cash).
- **Étapes** :
  1. **User** -> **Frontend** : Clique sur "Checkout" dans le panier.
  2. **Frontend** -> **Backend** : Envoie une requête POST `/api/orders` avec les données (formations, méthode de paiement).
  3. **Backend** -> **Database** : Insère une nouvelle entrée dans `registrations` avec status "pending".
  4. **Backend** -> **Payment Gateway** : Si méthode = mvola/spray_info, traite le paiement et renvoie transaction_id.
  5. **Payment Gateway** -> **Backend** : Confirme le paiement (ou erreur).
  6. **Backend** -> **Database** : Met à jour `registrations` (status = "paid") et insère dans `payments` (si applicable).
  7. **Backend** -> **Frontend** : Retourne une réponse (success/pending/cash).
  8. **Frontend** -> **User** : Affiche un message de confirmation.
- **Conditions** :
  - Si méthode = "cash", pas d'appel à Payment Gateway, status reste "pending" jusqu'à validation manuelle par Admin.
- **Description Visuelle** :
  - Lignes verticales (lifelines) pour chaque acteur/objet.
  - Flèches horizontales avec messages (ex. "POST /api/orders").
  - Boîtes de décision pour les conditions (ex. if payment_method = cash).

#### Référence Visuelle


---

### Instructions pour Créer les Diagrammes
1. **Outil Recommandé** : Utilisez Draw.io (gratuit, en ligne) pour dessiner ces diagrammes.
   - **Use Case** : Créez un canevas, ajoutez des bâtons pour acteurs, ovales pour cas, et reliez avec des lignes.
   - **Class** : Utilisez des rectangles avec trois sections, ajoutez flèches pour relations.
   - **Sequence** : Dessinez des lignes verticales, ajoutez des flèches horizontales avec étiquettes.
2. **Validation** : Vérifiez avec un collègue ou moi pour s'assurer que tout est cohérent.

---

### Prochaines Étapes
- **Implémentation** : Une fois les diagrammes validés, implémentons `Checkout.js` avec les options de paiement.
- **Débogage** : Si `addToCart` ne fonctionne toujours pas, partagez votre `App.js` pour une correction.

Dites-moi si vous voulez que je détaille un diagramme spécifique ou que je passe au code !
'''