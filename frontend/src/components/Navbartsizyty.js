import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Déconnexion réussie !');
  };

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <img src="/logo.png" alt="Spray Info" className="h-12" />
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-cyan-300">Home</a>
          <a href="/formations" className="hover:text-cyan-300">Formations</a>
          <a href="/panier" className="hover:text-cyan-300">Panier</a>
        </div>
      </div>

      {/* CE QU'IL FAUT MAINTENANT */}
      <div className="flex items-center space-x-4">
        {user ? (
          // CONNECTÉ → Affiche le nom + Déconnexion
          <div className="flex items-center space-x-4">
            <div className="bg-cyan-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium hidden sm:block">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          // PAS CONNECTÉ → Deux boutons clairs
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="border border-cyan-400 hover:bg-cyan-400 hover:text-blue-900 px-5 py-2 rounded-lg font-medium transition"
            >
              Se connecter
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-lg font-medium transition"
            >
              S’inscrire
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}