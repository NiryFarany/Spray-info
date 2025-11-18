'''
Je m'excuse pour le malentendu ! Vous avez raison de demander les schémas (diagrammes) de manière plus explicite. Comme je ne peux pas générer directement des images ou des fichiers graphiques ici, je vais vous fournir des descriptions détaillées et structurées de chaque diagramme UML (Diagramme de Cas d'Utilisation, Diagramme de Classes, Diagramme de Séquence) pour votre projet Spray Info Formation. Ces descriptions sont suffisamment précises pour que vous puissiez les dessiner vous-même avec un outil comme Draw.io, Lucidchart, ou Visual Paradigm. Je vais aussi inclure des annotations textuelles pour chaque élément, et je réutiliserai les références visuelles génériques déjà proposées pour vous guider visuellement. Allons-y !

---

### 1. Diagramme de Cas d'Utilisation (Use Case Diagram)
#### Description Détaillée
- **Objectif** : Représenter les interactions entre les acteurs et les fonctionnalités du système.
- **Acteurs** :
  - **Étudiant (User)** : Représenté par un bâton (stick figure) à gauche.
  - **Administrateur (Admin)** : Représenté par un bâton à droite.
- **Cas d'Utilisation** (Ovales) :
  - **Browse Formations** : Consulter la liste des formations présentielles (nom, description, prix, lieu, dates).
  - **Add to Cart** : Ajouter une formation au panier.
  - **Checkout** : Choisir un mode de paiement (Mvola, compte Spray Info, ou en espèces) et finaliser l'inscription.
  - **View History** : Consulter l'historique des inscriptions.
  - **Login** : Se connecter au système.
  - **Register** : Créer un compte.
  - **Manage Formations** : Ajouter, modifier ou supprimer des formations (spécifique à Admin).
  - **Approve Registrations** : Valider les inscriptions (surtout pour paiement en espèces, spécifique à Admin).
  - **Manage Users** : Gérer les comptes utilisateurs (bloquer/débloquer, spécifique à Admin).
- **Relations** :
  - **Inclusion** : "Browse Formations" <<include>> "Add to Cart" (Browse doit précéder Add).
  - **Dépendance** : "Checkout" dépend de "Add to Cart" (une flèche pointillée de Checkout vers Add to Cart).
  - **Association** : Lignes reliant "User" à Login, Register, Browse Formations, Add to Cart, Checkout, View History.
  - Lignes reliant "Admin" à Manage Formations, Approve Registrations, Manage Users.
- **Annotations** :
  - Étiquette "Étudiant" près du bâton User.
  - Étiquette "Administrateur" près du bâton Admin.
  - Chaque ovale contient le nom du cas en anglais (ex. "Browse Formations").
- **Disposition** :
  - Placez "User" à gauche, "Admin" à droite.
  - Disposez les cas d'utilisation en deux colonnes : ceux de User (gauche), ceux de Admin (droite).
  - Ajoutez un système central (rectangle) étiqueté "Spray Info Formation System" reliant tous les cas.

#### Référence Visuelle


---

### 2. Diagramme de Classes (Class Diagram)
#### Description Détaillée
- **Objectif** : Définir les entités, leurs attributs, méthodes, et relations dans le système.
- **Classes** (Rectangles avec trois sections : nom, attributs, méthodes) :
  - **User** :
    - Attributs : -id: int [PK], -name: varchar, -email: varchar [unique], -password_hash: varchar, -role: enum (student/admin).
    - Méthodes : +login(): void, +register(): void.
  - **Formation** :
    - Attributs : -id: int [PK], -name: varchar, -description: text, -price: decimal, -location: varchar, -start_date: date, -end_date: date, -capacity: int.
    - Méthodes : +getDetails(): string, +updateCapacity(): void.
  - **Registration** :
    - Attributs : -id: int [PK], -user_id: int [FK -> User.id], -formation_id: int [FK -> Formation.id], -status: enum (pending/approved/paid/cash), -payment_method: enum (mvola/spray_info/cash), -registration_date: date.
    - Méthodes : +updateStatus(): void, +getStatus(): string.
  - **Payment** :
    - Attributs : -id: int [PK], -registration_id: int [FK -> Registration.id], -amount: decimal, -method: enum (mvola/spray_info/cash), -transaction_id: varchar, -date: date.
    - Méthodes : +processPayment(): bool, +getTransactionDetails(): string.
- **Relations** :
  - **User** 1-* **Registration** : Flèche de User à Registration avec "1" à User et "*" à Registration.
  - **Formation** 1-* **Registration** : Flèche de Formation à Registration avec "1" à Formation et "*" à Registration.
  - **Registration** 1-1 **Payment** : Flèche de Registration à Payment avec "1" des deux côtés (optionnel, car paiement peut être "cash").
- **Annotations** :
  - Utilisez "-" pour les attributs privés, "+" pour les méthodes publiques.
  - Ajoutez [PK] pour les clés primaires, [FK] pour les clés étrangères.
  - Étiquetez les flèches avec la multiplicité (ex. "1..*").
- **Disposition** :
  - Placez "User" en haut à gauche, "Formation" à droite, "Registration" au centre, "Payment" en bas.
  - Reliez avec des flèches claires.

#### Référence Visuelle


---

### 3. Diagramme de Séquence (Sequence Diagram)
#### Description Détaillée
- **Objectif** : Illustrer le flux d'interactions pour le cas "Checkout" (paiement d'une inscription).
- **Acteurs et Objets** (Lignes verticales, lifelines) :
  - **User** : L'étudiant.
  - **Frontend** : Interface React.
  - **Backend** : API Flask.
  - **Database** : MySQL.
  - **Payment Gateway** : Simulateur pour Mvola/Spray Info (ou placeholder pour cash).
- **Étapes** (Flèches horizontales avec messages) :
  1. **User** -> **Frontend** : Clique sur "Checkout" (message : "Checkout Request").
  2. **Frontend** -> **Backend** : Envoie POST `/api/orders` (message : "POST /api/orders {formations, payment_method}").
  3. **Backend** -> **Database** : Insère dans `registrations` (message : "INSERT INTO registrations (status=pending)").
  4. **Backend** -> **Payment Gateway** : Si payment_method = mvola/spray_info, traite paiement (message : "Process Payment").
  5. **Payment Gateway** -> **Backend** : Retourne transaction_id ou erreur (message : "Return Transaction ID" ou "Error").
  6. **Backend** -> **Database** : Met à jour `registrations` (status=paid) et insère dans `payments` (message : "UPDATE registrations, INSERT INTO payments").
  7. **Backend** -> **Frontend** : Retourne réponse (message : "Response {success/pending/cash}").
  8. **Frontend** -> **User** : Affiche confirmation (message : "Show Confirmation").
- **Conditions** :
  - **Alt (Alternative)** : Si payment_method = "cash", pas d'appel à Payment Gateway, Backend renvoie status "pending" directement.
- **Annotations** :
  - Ajoutez une boîte "alt" pour la condition "cash" avec une branche séparée.
  - Numérotez les messages (1:, 2:, etc.) pour l'ordre.
- **Disposition** :
  - Placez les lifelines de gauche à droite : User, Frontend, Backend, Database, Payment Gateway.
  - Alignez les flèches verticalement selon l'ordre des étapes.

#### Référence Visuelle


---

### Instructions pour Créer les Diagrammes
1. **Outil** : Utilisez **Draw.io** (gratuit, en ligne sur app.diagrams.net).
   - **Use Case** : Sélectionnez "Use Case" dans la barre latérale, ajoutez acteurs (stick figures), cas (ovales), et reliez avec des lignes.
   - **Class** : Utilisez "Entity" ou "Class" pour les rectangles, ajoutez attributs/méthodes, et dessinez des flèches pour relations.
   - **Sequence** : Choisissez "Sequence" dans le menu, ajoutez lifelines, et dessinez des flèches avec étiquettes.
2. **Export** : Enregistrez en PNG ou PDF pour intégration dans votre documentation.
3. **Validation** : Partagez-moi les fichiers ou captures si vous voulez une revue.

---

### Prochaines Étapes
- **Création des Diagrammes** : Dessinez-les selon ces descriptions.
- **Implémentation** : Une fois validés, passons à `Checkout.js` avec les options de paiement.
- **Débogage** : Si `addToCart` reste bloqué, vérifions `App.js`.

Dites-moi si vous avez besoin d'aide pour dessiner ou si vous voulez du code !
'''