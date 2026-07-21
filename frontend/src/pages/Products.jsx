import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Products = ({ products = [], loading = false }) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    if (location.state && location.state.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const categories = ["Semua", ...new Set(products.map(p => p.cat).filter(Boolean))];

  const filteredProducts = activeCategory === "Semua" 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  return (
    <section className="view active" id="view-produk">
      <div className="section-head">
        <h2>Semua Produk</h2>
      </div>

      <div className="categories" id="category-chips">
        {categories.map((c, idx) => (
          <button 
            key={idx} 
            className={`chip ${c === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">Memuat semua produk...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="error-state">Tidak ada produk dalam kategori ini.</div>
      ) : (
        <div className="product-grid" id="all-grid">
          {filteredProducts.map((p, i) => (
            <ProductCard key={p.id || p._id || i} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
