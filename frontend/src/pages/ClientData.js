
import { useNavigate } from "react-router-dom";
//import {  UsersIcon,ClipboardListIcon,UserCircleIcon,ShoppingCartIcon} from '@heroicons/react/solid';
import {  UsersIcon,UserCircleIcon,ShoppingCartIcon} from '@heroicons/react/solid';


export default function ClientData() {
  const navigate = useNavigate();
  return(
  
  <div className="container mx-auto py-20 px-6 text-center">

  <div className="flex items-center justify-center mb-10">
    <UsersIcon className="h-12 w-12 text-blue-600 mr-4" />
    <h1 className="text-3xl font-bold text-blue-700">
      welcome to user page
    </h1>
  </div>

  <div className="flex justify-center space-x-12 max-w-4xl w-full mx-auto"> 
    <div
      className="cursor-pointer bg-white shadow-xl rounded-2xl p-10 text-center border-t-4 border-blue-600 hover:shadow-2xl transition max-w-full"
      // onClick={() => navigate("/my-info/id")}
      onClick={() => navigate("/my-info")}
    >
      <UserCircleIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">
        Mes informations
      </h2>
    </div>
    <div
      className="cursor-pointer bg-white shadow-xl rounded-2xl p-10 text-center border-t-4 border-blue-600 hover:shadow-2xl transition max-w-full"
      onClick={() => navigate("/my-orders")}
    >
      <ShoppingCartIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">
        Mes Commandes
      </h2>
    </div>
  </div>

</div>
    );
  
} 