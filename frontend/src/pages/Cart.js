// src/pages/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import {
  FaTrashAlt
} from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleClearCart = () => {
    clearCart();
    toast.info("Your cart has been emptied.");
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white shadow-2xl rounded-xl mt-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-3 flex items-center">
        <span className="mr-3 text-blue-600 text-4xl">My Shopping Cart</span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">
            The cart is empty. Time to find a great course!
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
                  <div className="flex flex-col ml-4">
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
                    Swal.fire({
                      title: 'Are you sure?',
                      text: `Remove ${item.name} from cart?`,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, remove it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeFromCart(item.id);
                        toast.warn(`${item.name} removed from cart.`);
                        Swal.fire('Removed!', '', 'success');
                      }
                    });
                  }}
                  className="text-red-500 hover:text-red-700 p-3 rounded-full hover:bg-red-100 text-xl"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-5 border-t-2 border-gray-200 mt-6">
            <p className="text-xl font-bold text-gray-800">Total:</p>
            <p className="text-2xl font-extrabold text-blue-600">
              {getTotal().toLocaleString("en-US")} Ar
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleProceedToCheckout}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-bold"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Clear cart?',
                  text: "This action cannot be undone!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Yes, clear it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClearCart();
                    Swal.fire('Cleared!', 'Your cart is empty.', 'success');
                  }
                });
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-bold"
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