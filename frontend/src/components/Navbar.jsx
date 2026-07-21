import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = ({ defaultProductId = "1", cartCount = 2 }) => {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="logo">
          Shoppu
        </Link>
        <div className="nav-tabs">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
            end
          >
            Beranda
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Daftar Produk
          </NavLink>
        </div>
        <div className="nav-actions">
          <button className="cart-btn" onClick={() => alert("Keranjang belanja")}>
            Keranjang <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
