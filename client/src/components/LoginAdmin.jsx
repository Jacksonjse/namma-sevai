import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { setToken } from '../utils/auth';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      if (res.data.success && res.data.role === 'admin') {
        setToken(res.data.token, res.data.role);
        navigate('/admin/dashboard');
      } else {
        setError('Access Denied. Not a valid admin account.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ color: 'var(--color-saffron)' }}>Namma Sevai - Admin Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-saffron">
          Admin Login
        </button>
      </form>
      <div className="auth-link">
        <p>
          Not an Admin? <Link to="/login/user">User Login</Link>
        </p>
        <p>
          Need an Admin account? <Link to="/register/admin">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;