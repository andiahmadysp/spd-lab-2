import React from 'react';
import { useNavigate } from 'react-router-dom';

const cardColors = ["#f2f2f2", "#ececec", "#f7f7f7"];

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();

  const rupiah = (n) => {
    if (typeof n !== 'number') return n;
    return "Rp " + n.toLocaleString("id-ID");
  };

  const id = product.id || product._id;

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  // Fallback SVG icon if imageUrl is not available or fails
  const renderFallbackIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0A3B60" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 44, height: 44 }}>
      <circle cx="12" cy="8" r="5"/><line x1="12" y1="13" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/>
    </svg>
  );

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="thumb" style={{ background: cardColors[index % cardColors.length] }}>
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
            }} 
          />
        ) : null}
        <div style={{ display: product.imageUrl ? 'none' : 'flex' }}>
          {renderFallbackIcon()}
        </div>
      </div>
      <div className="product-info">
        <div className="product-cat">{product.cat}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">{rupiah(product.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
