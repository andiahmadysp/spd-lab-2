import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (e, cat) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    navigate('/products', { state: { category: cat } });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Terima kasih telah berlangganan!');
    e.target.reset();
  };

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo">Shoppu</div>
          <p>Kurasi peralatan meja kerja premium dengan desain timeless untuk meningkatkan produktivitas dan estetika ruang kerja Anda.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" aria-label="Pinterest" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22a9 9 0 0 1-2-5.5c0-4.3 3.5-7.5 7.5-7.5s7.5 3.2 7.5 7.5c0 3.7-2.3 6.5-5.5 6.5s-2.5-1.8-2.5-2.8c0-1 .7-2.7.7-4 0-1.2-.6-2.2-2-2.2s-2.5 1.5-2.5 3.5c0 1.2.4 2 .4 2S10 20.3 9.4 22H8z"></path></svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h3>Belanja</h3>
          <ul className="footer-links">
            <li><Link to="/products" onClick={() => handleCategoryClick({ preventDefault: ()=>{} }, 'Semua')}>Semua Produk</Link></li>
            <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Pencahayaan')}>Pencahayaan</a></li>
            <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Furnitur')}>Furnitur</a></li>
            <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Elektronik')}>Elektronik</a></li>
            <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Alat Tulis')}>Alat Tulis</a></li>
            <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Aksesori')}>Aksesori</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Bantuan</h3>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => e.preventDefault()}>Lacak Pesanan</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Kebijakan Pengembalian</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>FAQ / Hubungi Kami</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Panduan Perawatan</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Newsletter</h3>
          <p>Dapatkan pembaruan produk terbaru dan penawaran eksklusif.</p>
          <form className="footer-newsletter" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Email Anda" required />
            <button type="submit">Daftar</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span>&copy; 2026 SHOPPU. HAK CIPTA DILINDUNGI.</span>
      </div>
    </footer>
  );
};

export default Footer;
