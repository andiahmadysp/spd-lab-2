import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/products';

const ProductDetail = ({ products = [] }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      setLoading(true);
      // Try to find from props first for instant rendering
      const found = products.find(p => (p.id || p._id || String(p.id)) === String(id));
      if (found) {
        if (isMounted) {
          setProduct(found);
          setLoading(false);
        }
      } else {
        const fetched = await getProductById(id);
        if (isMounted) {
          setProduct(fetched);
          setLoading(false);
        }
      }
    };
    fetchDetail();
    return () => { isMounted = false; };
  }, [id, products]);

  const changeQty = (delta) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  const rupiah = (n) => {
    if (typeof n !== 'number') return n;
    return "Rp " + n.toLocaleString("id-ID");
  };

  const renderFallbackIcon = (size = 96) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0A3B60" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <circle cx="12" cy="8" r="5"/><line x1="12" y1="13" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/>
    </svg>
  );

  if (loading) {
    return (
      <section className="view active" id="view-detail">
        <div className="loading-state">Memuat detail produk...</div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="view active" id="view-detail">
        <div className="error-state">
          Produk tidak ditemukan. <Link to="/products" style={{ color: 'var(--accent)', fontWeight: 600 }}>Kembali ke daftar produk</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="view active" id="view-detail">
      <div className="breadcrumb">
        <Link to="/">Beranda</Link><span className="sep">/</span>
        <Link to="/products">Produk</Link><span className="sep">/</span>
        <span id="crumb-name">{product.name}</span>
      </div>

      <div className="detail-layout">
        <div>
          <div className="gallery-main" id="gallery-main">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div style={{ display: product.imageUrl ? 'none' : 'flex' }}>
              {renderFallbackIcon(96)}
            </div>
          </div>
          <div className="gallery-thumbs" id="gallery-thumbs">
            {[0, 1, 2].map(i => (
              <div 
                key={i} 
                className={`gt ${i === activeThumb ? 'active' : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={`${product.name} thumb ${i}`} />
                ) : (
                  renderFallbackIcon(26)
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="detail-cat" id="detail-cat">{product.cat}</div>
          <h1 className="detail-title" id="detail-title">{product.name}</h1>
          <div className="detail-price" id="detail-price">{rupiah(product.price)}</div>
          <p className="detail-desc" id="detail-desc">{product.desc}</p>

          <div className="qty-row">
            <div className="stepper">
              <button onClick={() => changeQty(-1)}>&minus;</button>
              <span id="qty">{qty}</span>
              <button onClick={() => changeQty(1)}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-primary" onClick={() => alert(`Berhasil menambahkan ${qty} ${product.name} ke keranjang!`)}>
              Tambah ke Keranjang
            </button>
            <button className="btn-ghost" onClick={() => alert("Produk disimpan!")}>
              Simpan
            </button>
          </div>

          <table className="spec-table">
            <tbody>
              <tr><td>Material</td><td id="spec-material">{product.material || '-'}</td></tr>
              <tr><td>Dimensi</td><td id="spec-dimensi">{product.dimensi || '-'}</td></tr>
              <tr><td>Berat</td><td id="spec-berat">{product.berat || '-'}</td></tr>
              <tr><td>Garansi</td><td id="spec-garansi">{product.garansi || '-'}</td></tr>
              <tr><td>SKU</td><td id="spec-sku">{product.sku || '-'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
