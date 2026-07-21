import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      showToast('Password dan konfirmasi password tidak cocok.', 'error');
      return;
    }
    if (form.password.length < 6) {
      showToast('Password minimal 6 karakter.', 'warning');
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      showToast(`Akun berhasil dibuat! Selamat datang, ${form.name}! 🎉`, 'success');
      navigate('/', { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || 'Registrasi gagal. Coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Shoppu</div>
          <h1 className="auth-title">Buat Akun Baru</h1>
          <p className="auth-subtitle">Daftar untuk mulai berbelanja di Shoppu</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} id="register-form">
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Nama Lengkap</label>
            <input
              id="register-name"
              type="text"
              name="name"
              className="form-input"
              placeholder="Nama Anda"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              name="email"
              className="form-input"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Minimal 6 karakter"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm">Konfirmasi Password</label>
            <input
              id="register-confirm"
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Ulangi password Anda"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            id="register-submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-btn-loading">
                <span className="spinner" />
                Memproses...
              </span>
            ) : 'Buat Akun'}
          </button>
        </form>

        <p className="auth-switch">
          Sudah punya akun?{' '}
          <Link to="/login" id="go-to-login" className="auth-link">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
