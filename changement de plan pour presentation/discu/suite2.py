'''
Super, si les pages `Formations.js` et ses composants associés sont terminés et fonctionnent bien, c’est une excellente étape ! Maintenant, passons à la suite logique de votre projet Spray Info Formation. D'après la structure et le flux d'une plateforme éducative, la prochaine priorité est de développer la gestion du panier avec `Cart.js`. Cela permettra aux utilisateurs de voir les formations qu'ils ont sélectionnées pour s'inscrire et de passer à l'étape suivante (paiement via `Checkout.js`).

### Explication en Français
- **Objectif** : `Cart.js` affichera les formations ajoutées via un bouton "Register" dans `CardFormations.js`, en utilisant `CartContext.js` pour gérer l'état du panier. Pour l'instant, nous simulerons l'ajout au panier avec des mocks, et plus tard, nous connecterons cela au backend.
- **Approche** : Nous allons créer une interface simple qui liste les formations dans le panier, avec un total et un bouton pour passer à la caisse (`Checkout`). Nous devons aussi définir des fonctions de base dans `CartContext.js` pour ajouter et retirer des éléments.
- **Prochaines étapes** : Une fois `Cart.js` opérationnel, nous passerons à `Checkout.js` pour simuler le paiement.

### Code pour CartContext.js
Commençons par configurer le contexte pour gérer le panier :

<xaiArtifact artifact_id="d0fa7926-b1f4-484b-931d-1f7b7e782de7" artifact_version_id="f01210ab-dbf0-4844-9ee5-8b825b0cc066" title="CartContext.js" contentType="text/javascript">

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (formation) => {
    setCart((prevCart) => [...prevCart, { ...formation, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

</xaiArtifact>

### Code pour Cart.js
Ensuite, créons la page pour afficher le contenu du panier :

<xaiArtifact artifact_id="677ea8f6-544c-4590-9884-3f72f0b9c10a" artifact_version_id="b608f71b-a88c-4b75-91f6-4ed638a5a137" title="Cart.js" contentType="text/javascript">

import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="container mx-auto p-4">Your cart is empty!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="bg-white p-4 shadow-md rounded-lg flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p>Price: ${item.price} Ar x {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <p className="text-xl font-bold">Total: ${total} Ar</p>
        <Link to="/checkout" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;

</xaiArtifact>

### Intégration dans App.js
Ajoutez `Cart.js` et `CartProvider` dans votre `App.js` pour activer le contexte :

```jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Formations from './pages/Formations';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/cart" element={<Cart />} />
          {/* Ajoutez d'autres routes ici */}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
```

### Mise à Jour de CardFormations.js
Modifiez `CardFormations.js` pour utiliser `addToCart` :

<xaiArtifact artifact_id="2f4e372f-84c5-4a29-b62f-d1affc281717" artifact_version_id="a5aaaa03-0db3-42b1-93f8-3f3435e0aaeb" title="CardFormations.js" contentType="text/javascript">

import React from 'react';
import { useCart } from '../context/CartContext';

const CardFormations = ({ formation }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold">{formation.name}</h3>
      <p className="text-gray-600">{formation.description}</p>
      <p className="text-gray-800 font-bold">Price: ${formation.price} Ar</p>
      <button
        onClick={() => addToCart(formation)}
        className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </div>
  );
};

export default CardFormations;

</xaiArtifact>

### Étapes Suivantes
1. **Testez** : Lancez `npm start`, naviguez vers `/formations`, ajoutez des formations au panier, puis allez à `/cart` pour voir les résultats.
2. **Améliorations** : Ajoutez une gestion de la quantité (ex. incrémenter `quantity` dans `CartContext.js`) et validez le style.
3. **Prochaine Page** : Une fois `Cart.js` opérationnel, passons à `Checkout.js` pour simuler le paiement.

Dites-moi si vous voulez que je développe `Checkout.js` ou si vous avez des questions sur ce code !
'''