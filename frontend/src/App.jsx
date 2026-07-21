import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import { getProducts } from './api/products';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const defaultId = products.length > 0 ? (products[0].id || products[0]._id) : "1";

  return (
    <Router>
      <div className="app-container">
        <Navbar defaultProductId={defaultId} cartCount={2} />
        <main>
          <Routes>
            <Route path="/" element={<Home products={products} loading={loading} />} />
            <Route path="/products" element={<Products products={products} loading={loading} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
