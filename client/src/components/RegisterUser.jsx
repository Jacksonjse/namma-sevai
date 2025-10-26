import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { setToken } from '../utils/auth';

const RegisterUser = () => {
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
    try {
      // We explicitly send role: 'user'
      const res = await api.post('/auth/register', { ...formData, role: 'user' }); 
      if (res.data.success) {
        setToken(res.data.token, res.data.role);
        navigate('/user/dashboard'); // Go to user dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Namma Sevai - User Registration</h2>
      
      {/* --- THIS PARAGRAPH IS NOW REMOVED --- */}
      {/* <p style={{ textAlign: 'center', color: '#555', marginTop: '-1rem', marginBottom: '1rem' }}>
        Registration is only open to @karunya.edu emails.
      </p> 
      */}

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
          <label htmlFor="email">Email</label> {/* Label updated */}
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
        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <div className="auth-link">
        <p>
          Already have an account? <Link to="/login/user">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;