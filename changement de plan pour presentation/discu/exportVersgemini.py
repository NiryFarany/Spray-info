'''
C'est une excellente base pour la conception de votre plateforme. Votre description textuelle des diagrammes UML (Use Case, Classes, Séquence) est claire, complète et couvre bien les exigences spécifiques de Spray Info.

Puisque je ne peux pas générer les images des diagrammes directement, je vais vous donner ici la structure UML en utilisant un format de texte structuré et une **référence visuelle générique** pour chaque type de schéma, qui représente fidèlement les éléments que vous avez décrits. Cela vous permettra de les transposer facilement dans un outil comme Draw.io ou Lucidchart.

-----

## 1\. Diagramme de Cas d'Utilisation (Use Case Diagram)

Ce diagramme se concentre sur **qui fait quoi** dans le système.

### Acteurs et Cas d'Utilisation

| Acteur | Cas d'Utilisation Principal | Cas d'Utilisation Inclus/Étendu |
| :--- | :--- | :--- |
| **Étudiant (User)** | **Se Connecter** | **S'inscrire** |
| | **Consulter Formations** | **Ajouter au Panier** (\<\<include\>\>) |
| | **Finaliser Commande (Checkout)** | **Payer** (\<\<extend\>\>) |
| | **Voir Historique** | |
| **Administrateur (Admin)** | **Gérer Formations** | Ajouter/Modifier/Supprimer Formation |
| | **Approuver Inscriptions** | Gérer Statut de Paiement |

### Description des Relations

| Relation | Source | Destination | Type |
| :--- | :--- | :--- | :--- |
| **Consultation** | Étudiant | Consulter Formations | Association |
| **Commande** | Consulter Formations | Ajouter au Panier | \<\<include\>\> |
| **Processus** | Ajouter au Panier | Finaliser Commande | Séquence/Association |
| **Paiement** | Finaliser Commande | Payer | \<\<extend\>\> (par méthode) |
| **Administration**| Administrateur | Gérer Formations | Association |
| **Validation** | Administrateur | Approuver Inscriptions | Association |

-----

## 2\. Diagramme de Classes (Class Diagram)

Ce diagramme représente la structure des données du système et leurs interconnexions.

### Structure des Classes et Attributs

| Classe | Attributs (Types) | Méthodes | Relations Clés |
| :--- | :--- | :--- | :--- |
| **User** | id (PK), name, email, password\_hash, role (enum) | login(), register() | **1** - $\rightarrow$ **0..** Registration |
| **Formation** | id (PK), name, description, price, location, start\_date, end\_date, capacity | getDetails(), updateCapacity() | **1** - $\rightarrow$ **0..** Registration |
| **Registration**| id (PK), user\_id (FK), formation\_id (FK), status (enum), payment\_method (enum), registration\_date | updateStatus(), getStatus() | **1** - $\rightarrow$ **0..1** Payment |
| **Payment** | id (PK), registration\_id (FK), amount, method (enum), transaction\_id, date | processPayment(), getTransactionDetails() | $\leftarrow$ **1** - 1 Registration |

### Détails des Multiplicités

  * Un **User** peut avoir **plusieurs (0..\*)** **Registration**s.
  * Une **Formation** peut avoir **plusieurs (0..\*)** **Registration**s.
  * Une **Registration** est liée à **un et un seul (1)** **User** et **une seule (1)** **Formation**.
  * Une **Registration** peut avoir **zéro ou un (0..1)** **Payment** (zéro si en espèces et en attente, ou si le paiement échoue).

-----

## 3\. Diagramme de Séquence (Sequence Diagram)

Ce diagramme détaille le flux d'informations pour la fonctionnalité critique de **Finalisation de la Commande (Checkout)**, en gérant la condition du paiement en espèces.

### Flux d'Interactions Détaillé

| Étape | Source | Destination | Message/Action | Condition |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **User** | **Frontend** | `clic('Checkout')` | |
| 2 | **Frontend** | **Backend** | `POST /api/registrations (data, method)` | |
| 3 | **Backend** | **Database** | `INSERT Registration (status='pending')` | |
| 4 | **Backend** | **Backend** | **[alt]** `if method = mvola/spray_info` | |
| 4.1 | **Backend** | **Payment Gateway**| `ProcessPayment(amount, method)` | |
| 4.2 | **Payment Gateway** | **Backend** | `Return Transaction (ID/Success)` | |
| 4.3 | **Backend** | **Database** | `UPDATE Registration (status='paid')` | |
| 4.4 | **Backend** | **Database** | `INSERT Payment (details)` | |
| 5 | **Backend** | **Backend** | **[alt]** `else (method = cash)` | |
| 5.1 | **Backend** | **Database** | `UPDATE Registration (status='cash_pending')` | |
| 6 | **Backend** | **Frontend** | `Return Response (Success/Pending/Error)` | |
| 7 | **Frontend** | **User** | `Display Confirmation Message` | |

-----

Ces schémas vous fournissent la structure formelle pour la base de données, l'API et le flux utilisateur de votre plateforme. Vous pouvez maintenant utiliser un outil de schématisation pour les dessiner en vous basant sur ces descriptions.
'''