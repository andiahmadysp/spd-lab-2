import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { getProducts } from './api/products';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { ToastProvider } from './context/ToastContext';
import './index.css';

function AppRoutes() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const fetchAllProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      if (isMounted) {
        setProducts(data || []);
        setLoading(false);
      }
    };
    fetchAllProducts();
    return () => { isMounted = false; };
  }, []);

  // Show blank while checking stored token on first load
  if (authLoading) {
    return <div className="loading-state"><p>Memuat...</p></div>;
  }

  return (
    <div className="app-container">
      <Navbar cartCount={2} />
      <main>
        <Routes>
          <Route path="/" element={<Home products={products} loading={loading} />} />
          <Route path="/products" element={<Products products={products} loading={loading} />} />
          <Route path="/product/:id" element={<PrivateRoute><ProductDetail products={products} /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
