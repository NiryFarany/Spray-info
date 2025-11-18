// src/components/Sidebar.js

/*

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext2';
//import { AuthProvider} from '../context/AuthContext2';
//desolé,tsy hiako avao koa ilavako sidebar no raha mitovy avao, sady fa navbar io, avelao @nio
//tsy hampiasaiko ty sidebar ty

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-64 h-screen bg-blue-900 text-white fixed p-4">
      <h2 className="text-xl font-bold mb-4">Spray Info</h2>
      <nav>
        <ul className="space-y-2">
          <li><Link to="/" className="block p-2 hover:bg-blue-700">Accueil</Link></li>
          <li><Link to="/formations" className="block p-2 hover:bg-blue-700">Formations</Link></li>
          {user && <li><Link to="/cart" className="block p-2 hover:bg-blue-700">Panier</Link></li>}
          {user?.role === 'admin' && <li><Link to="/admin" className="block p-2 hover:bg-blue-700">Admin</Link></li>}
          {user ? (
            <li><button onClick={logout} className="block p-2 w-full text-left hover:bg-blue-700">Déconnexion</button></li>
          ) : (
            <>
              <li><Link to="/login" className="block p-2 hover:bg-blue-700">Connexion</Link></li>
              <li><Link to="/register" className="block p-2 hover:bg-blue-700">Inscription</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


*/