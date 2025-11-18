import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import {
  FaLaptopCode,
  FaNetworkWired,
  FaShieldAlt,
  FaRobot,
  FaBookOpen,
  FaChartLine,
  FaGraduationCap,
  FaUniversity,
  FaTrashAlt
} from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleClearCart = () => {
    clearCart();
    toast.info("Your cart has been emptied.");
  };

  const getFormationIcon = (id) => {
    switch (id) {
      case 1:
        return <FaLaptopCode />;
      case 2:
        return <FaNetworkWired />;
      case 3:
        return <FaShieldAlt />;
      case 4:
        return <FaRobot />;
      case 5:
        return <FaBookOpen />;
      case 6:
        return <FaChartLine />;
      case 7:
        return <FaGraduationCap />;
      case 8:
        return <FaUniversity />;
      default:
        return <FaGraduationCap />;
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white shadow-2xl rounded-xl mt-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-3 flex items-center">
        <span className="mr-3 text-blue-600 text-4xl">🛒</span> My Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">
            The cart is empty. Time to find a great course! 🚀
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg hover:shadow-md transition duration-200"
              >
                <div className="flex items-center">
                  <span className="text-3xl text-gray-600 mr-4">
                    {getFormationIcon(item.id)}
                  </span>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-md text-gray-600 mt-1">
                      {item.price.toLocaleString("en-US")} Ar
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    /*

                    removeFromCart(item.id);
                    toast.warn(`${item.name} removed from cart.`);
                  }}
                  className="
                    text-red-500 hover:text-red-700
                    transition duration-150
                    p-3 rounded-full
                    hover:bg-red-100
                    focus:outline-none focus:ring-2 focus:ring-red-300
                    text-xl
                  "
                  aria-label={`Remove ${item.name}`}
                >
                */
                     Swal.fire({
          title: 'Are you sure?',
          text: `You won't be able to recover ${item.name} after this!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, remove it!',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            removeFromCart(item.id);
            toast.warn(`${item.name} removed from cart.`);
            Swal.fire(
              'Removed!',
              `${item.name} has been removed from your cart.`,
              'success'
            );
          }
        });
      }}
      className="
        text-red-500 hover:text-red-700
        transition duration-150
        p-3 rounded-full
        hover:bg-red-100
        focus:outline-none focus:ring-2 focus:ring-red-300
        text-xl
      "
      aria-label={`Remove ${item.name}`}
    >

                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-5 border-t-2 border-gray-200 mt-6">
            <p className="text-xl font-bold text-gray-800">Total:</p>
            <p className="text-2xl font-extrabold text-blue-600">
              {totalPrice.toLocaleString("en-US")} Ar
            </p>
          </div>

          {/* Bouton pour vider le panier */}
         <div className="mt-6 flex justify-between">
  <button
    onClick={() => toast.success("Proceeding to checkout...")}
    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-black-600 transition"
  >
    Proceed to Checkout
  </button>
  <button
  onClick={() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover your cart after this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleClearCart();
        Swal.fire(
          'Deleted!',
          'Your cart has been cleared.',
          'success'
        );
      }
    });
  }}
  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
>
  Clear Cart
</button>

</div>
        </>
      )}
    </div>
  );
};

export default Cart;
