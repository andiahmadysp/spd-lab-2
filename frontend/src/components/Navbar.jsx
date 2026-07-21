import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Navbar = ({ cartCount = 2 }) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isProductsActive = location.pathname.startsWith('/product');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    showToast('Kamu berhasil keluar. Sampai jumpa! 👋', 'info');
    navigate('/');
  };

  // User avatar initials
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="logo">
          Shoppu
        </Link>
        <div className="nav-tabs">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : ''}
            end
          >
            Beranda
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive || isProductsActive) ? 'active' : ''}
          >
            Daftar Produk
          </NavLink>
        </div>
        <div className="nav-actions">
          <button className="cart-btn" onClick={() => alert('Keranjang belanja')}>
            Keranjang <span className="cart-count">{cartCount}</span>
          </button>

          {user ? (
            <div className="user-menu" ref={dropdownRef}>
              <button
                id="user-menu-btn"
                className="user-avatar-btn"
                onClick={() => setDropdownOpen(prev => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                title={user.name}
              >
                <span className="user-avatar">{initials}</span>
                <span className="user-name-short">{user.name.split(' ')[0]}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ transition: 'transform .2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown" role="menu">
                  <div className="user-dropdown-header">
                    <span className="user-avatar user-avatar-lg">{initials}</span>
                    <div>
                      <p className="dropdown-name">{user.name}</p>
                      <p className="dropdown-email">{user.email}</p>
                    </div>
                  </div>
                  <hr className="dropdown-divider" />
                  <button
                    id="logout-btn"
                    className="dropdown-item dropdown-item-danger"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-nav-btns">
              <Link to="/login" id="nav-login-btn" className="btn-nav-login">Masuk</Link>
              <Link to="/register" id="nav-register-btn" className="btn-nav-register">Daftar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
