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

                {/* === PUBLIC === */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/formations" element={<Formations />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/forgot-password" element={<MyInfoForgotpw />} />

                {/* === USER CONNECTÉ UNIQUEMENT === */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />

                <Route path="/my-orders" element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                } />

                <Route path="/order/:id" element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                } />

                <Route path="/my-info" element={
                  <ProtectedRoute>
                    <MyInfo />
                  </ProtectedRoute>
                } />

                <Route path="/clientData" element={
                  <ProtectedRoute>
                    <ClientData />
                  </ProtectedRoute>
                } />

                {/* === ADMIN UNIQUEMENT === */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly={true}>
                    <Admin />
                  </ProtectedRoute>
                } />

                <Route path="/admin/formations" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminFormation />
                  </ProtectedRoute>
                } />

                <Route path="/admin/personnel" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPersonnel />
                  </ProtectedRoute>
                } />

                <Route path="/admin/orders" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminOrders />
                  </ProtectedRoute>
                } />

                <Route path="/admin/order_items" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminOrder_items />
                  </ProtectedRoute>
                } />

                <Route path="/admin/orderDetail/:id" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminOrderDetailInOrder_items />
                  </ProtectedRoute>
                } />

                <Route path="/admin/payment" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPayment />
                  </ProtectedRoute>
                } />

                <Route path="/admin/paymentDetail/:id" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPaymentDetail />
                  </ProtectedRoute>
                } />

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