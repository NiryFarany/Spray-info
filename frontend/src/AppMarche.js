import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import AdminFormation from "./pages/AdminFormation";
import AdminPersonnel from "./pages/AdminPersonnel";
import AboutUs from './pages/AboutUs';
import Register from './pages/Register';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Formations from './pages/Formations';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import '../src/assets/styles/index.css'
import Sidebar from './components/Sidebar';
import Confirmation from './pages/Confirmation'; // À créer
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import AdminOrders from './pages/AdminOrders';
import AdminOrder_items from './pages/AdminOrder_items'
import ClientData from './pages/ClientData'
import AdminOrderDetailInOrder_items from './pages/AdminOrderDetailInOrder_items'
import AdminPayment from './pages/AdminPayment'
import AdminPaymentDetail from './pages/AdminPaymentDetail'
import MyInfo from './pages/MyInfo'
import MyInfoForgotpw from './pages/MyInfoForgotpw'
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div id="app" className="bg-gray-100">
            <Navbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/formations" element={<Formations />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />

                {/* <Route path="/admin" element={<Admin />} /> */}
                <Route path="/admin/*" element={
                  <ProtectedRoute adminOnly={true}>
                    <Admin />
                  </ProtectedRoute>
                } />
                {/* <Route path="/admin/formations" element={<AdminFormation />} />    non atao tsiraidray le protectedRoute @ admin retra2*/}
                {/* <Route path="/admin/personnel" element={<AdminPersonnel />} /> */}
                <Route path="/aboutUs" element={<AboutUs />} />
                {/* Supprimez ou créez une page AboutUs si nécessaire */}
                {/* <Route path="/aboutUs" element={<AboutUs />} /> */}
                <Route path="/confirmation" element={<Confirmation />} />
                {/* <Route path="/my-orders" element={<MyOrders />} /> */}
                <Route path="/my-orders" element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                } />
                <Route path="/order/:id" element={<OrderDetail />} />
                {/* <Route path="/admin/orders" element={<AdminOrders />} /> */}
                {/* <Route path="/admin/order_items" element={<AdminOrder_items />} /> */}
                <Route path="/clientData" element={<ClientData />} />
                {/* <Route path="/admin/orderDetail/:id" element={<AdminOrderDetailInOrder_items />} /> */}
                {/* <Route path="/admin/payment" element={<AdminPayment />} /> */}
                {/* <Route path="/admin/paymentDetail/:id" element={<AdminPaymentDetail />} /> */}
               {/* tsy tokony hitovy @ zay zany gn raha hitan'ny admin vo gn olo tsotra apres nzao aby */}
                <Route path="/my-info" element={<MyInfo />} />
                <Route path="/forgot-password" element={<MyInfoForgotpw />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <ToastContainer position="top-right" autoClose={2000} />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;