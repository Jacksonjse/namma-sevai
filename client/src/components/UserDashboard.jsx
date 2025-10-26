import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { logout } from '../utils/auth';

// Helper function to create CSS-friendly class names for tags
const getCategoryClass = (category) => {
  return `category-${category.toLowerCase().replace(' ', '-')}`;
};

const UserDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Roads',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetches ALL complaints for the feed
  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints/all'); 
      setComplaints(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch complaints.');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submits a NEW complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.post('/complaints', formData); // 'POST /complaints' is a user-only route
      setMessage('Complaint submitted successfully!');
      setFormData({ title: '', description: '', category: 'Roads', imageUrl: '' });
      fetchComplaints(); // Refresh the list
      setTimeout(() => setMessage(''), 3000); // Clear message after 3s
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login/user');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="form-container" style={{ margin: '0 0 2rem 0', maxWidth: 'none' }}>
        <h2>Submit a New Complaint</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Roads">Roads</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (Optional)</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="https://example.com/image.png"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn">
            Submit Complaint
          </button>
        </form>
      </div>

      <h2>All Submitted Complaints</h2>
      <div className="complaint-list">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div 
              key={complaint._id} 
              className="complaint-card" // Removed category class from here
            >
              <h3>{complaint.title}</h3>
              
              {/* Displays the submitter's name in bold */}
              <p className="complaint-user">
                Submitted by: <strong>{complaint.user?.name || 'Unknown User'}</strong>
              </p>

              <p>{complaint.description}</p>
              
              <div className="complaint-meta">
                {/* Displays the category as a colored tag */}
                <span className={`category-tag ${getCategoryClass(complaint.category)}`}>
                  {complaint.category}
                </span>
                
                <span>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                
                {/* Displays the status (Pending, Resolved, etc.) */}
                <span className={`complaint-status status-${complaint.status.replace(' ', '')}`}>
                  {complaint.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No complaints have been submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;