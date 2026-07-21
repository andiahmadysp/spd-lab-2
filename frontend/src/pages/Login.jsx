import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form);
      showToast(`Selamat datang, ${data.user.name}! 👋`, 'success');
      navigate(from, { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || 'Login gagal. Coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Shoppu</div>
          <h1 className="auth-title">Selamat Datang</h1>
          <p className="auth-subtitle">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
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
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Masukkan password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            id="login-submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-btn-loading">
                <span className="spinner" />
                Memproses...
              </span>
            ) : 'Masuk'}
          </button>
        </form>

        <p className="auth-switch">
          Belum punya akun?{' '}
          <Link to="/register" id="go-to-register" className="auth-link">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
