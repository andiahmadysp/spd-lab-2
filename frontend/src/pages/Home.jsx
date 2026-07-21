import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = ({ products = [], loading = false }) => {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);

  const getHvStyle = (product) => {
    if (!product || !product.imageUrl) return {};
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75)), url("${product.imageUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#ffffff',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    };
  };

  return (
    <section className="view active" id="view-beranda">
      <div className="hero">
        <div>
          <div className="eyebrow">Perlengkapan Kerja</div>
          <h1>Alat kerja yang dirancang untuk dipakai bertahun-tahun.</h1>
          <p className="lead">
            Kurasi peralatan meja kerja dengan material tahan lama dan desain yang tidak lekang oleh tren. Dari lampu baca sampai keyboard mekanik.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Lihat Semua Produk
            </button>
            <button className="btn-ghost" onClick={() => alert("Shoppu adalah toko online peralatan kerja ergonomis modern.")}>
              Tentang Kami
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div 
            className="hv-block hv-1" 
            style={getHvStyle(products[0])}
            onClick={() => products[0] && navigate(`/product/${products[0].id || products[0]._id}`)}
          >
            {products[0] ? products[0].name : "Koleksi Meja Kerja"}
          </div>
          <div 
            className="hv-block hv-2" 
            style={getHvStyle(products[1])}
            onClick={() => products[1] && navigate(`/product/${products[1].id || products[1]._id}`)}
          >
            {products[1] ? products[1].name : "Diskon 20%"}
          </div>
          <div 
            className="hv-block hv-3" 
            style={getHvStyle(products[2])}
            onClick={() => products[2] && navigate(`/product/${products[2].id || products[2]._id}`)}
          >
            {products[2] ? products[2].name : "8 Produk Baru"}
          </div>
        </div>
      </div>

      <div className="section-head">
        <h2>Produk Pilihan</h2>
        <Link className="view-all" to="/products">Lihat semua &rarr;</Link>
      </div>

      {loading ? (
        <div className="loading-state">Memuat produk pilihan...</div>
      ) : (
        <div className="product-grid" id="featured-grid">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id || p._id || i} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
