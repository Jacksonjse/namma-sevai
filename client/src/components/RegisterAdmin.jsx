import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { setToken } from '../utils/auth';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // WARNING: In a real-world app, this route should be protected
    // or require a special invite code.
    try {
      // We now explicitly send role: 'admin'
      const res = await api.post('/auth/register', { ...formData, role: 'admin' });
      if (res.data.success) {
        setToken(res.data.token, res.data.role);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ color: 'var(--color-saffron)' }}>Namma Sevai - Admin Registration</h2>
      <p style={{ textAlign: 'center', color: '#888' }}>
        (This is for demo purposes. In production, this would be protected.)
      </p>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="password">Password (min 6 characters)</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>
        <button type="submit" className="btn btn-saffron">
          Register Admin
        </button>
      </form>
      <div className="auth-link">
        <p>
          Already have an admin account? <Link to="/login/admin">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterAdmin;