'''
Parfait ! Avant de redessiner le diagramme, je te propose une **version améliorée et complète** des cas d’utilisation, avec des ajouts logiques basés sur ton projet (plateforme Spray Info, formations présentielles, paiements, gestion par l’admin).

Tu confirmes ou tu modifies après 👇

---

# ✅ ✅ Nouvelle proposition complète du **Diagramme de Cas d’Utilisation**

## 🎓 1. Acteur : **User (Étudiant)**

Cas d’utilisation proposés :

1. **Créer un compte (Register)**
2. **Se connecter (Login)**
3. **Consulter les formations (Browse Formations)**
4. **Voir détails d’une formation**
5. **Ajouter au panier (Add to Cart)**
6. **Supprimer du panier (Remove from Cart)** *(facultatif mais logique)*
7. **Finaliser l’inscription / paiement (Checkout)**

   * Choisir mode de paiement :
     ◻ Mvola
     ◻ Compte Spray Info
     ◻ Espèces
8. **Voir son historique d’inscriptions (View History)**
9. **Gérer son profil (Update Profile)** *(optionnel mais souvent inclus)*

Relations :

* Browse Formations → include → Voir détails
* Voir détails → include → Add to Cart
* Add to Cart → include → Checkout

---

## 🧑‍💼 2. Acteur : **Admin**

Cas d’utilisation proposés :

1. **Se connecter (Admin Login)**
2. **Gérer les formations (Manage Formations)**

   * Ajouter une formation
   * Modifier une formation
   * Supprimer une formation
3. **Gérer les utilisateurs (Manage Users)**

   * Bloquer / débloquer
   * Supprimer
4. **Valider les inscriptions (Approve Registrations)**

   * Surtout pour paiement en espèces
5. **Générer rapports/statistiques** *(facultatif si tu veux)*

---

## ✅ Question pour toi (répond en une phrase) :

Est-ce que je :

### ✅ 1. Je garde **exactement** cette version pour dessiner ?

ou

### ✏️ 2. Tu veux modifier/retirer/ajouter quelque chose avant que je génère le diagramme en image ?

**Deux mots suffisent :**
➡ « c’est bon » → je dessine
➡ ou tu me dis ce qu'on change et je l’intègre directement.

'''