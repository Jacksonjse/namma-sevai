import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { logout } from '../utils/auth';

// Helper function to create CSS-friendly class names
const getCategoryClass = (category) => {
  return `category-${category.toLowerCase().replace(' ', '-')}`;
};

const AdminDashboard = () => {
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAllComplaints = async () => {
    try {
      const res = await api.get('/complaints/all');
      setAllComplaints(res.data.data);
      setFilteredComplaints(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch complaints.');
    }
  };

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  // Handle filtering locally
  useEffect(() => {
    if (filter === 'All') {
      setFilteredComplaints(allComplaints);
    } else {
      setFilteredComplaints(
        allComplaints.filter((c) => c.status === filter)
      );
    }
  }, [filter, allComplaints]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/complaints/${id}`, { status: newStatus });
      // Refresh list after update
      fetchAllComplaints();
    } catch (err) {
      console.error(err);
      setError('Failed to update status.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login/admin');
  };

  return (
    <div className="dashboard-container">
      {/* ... (header and filter are unchanged) ... */}
      <h2>All User Complaints</h2>
      {/* ... (error message and filter dropdown are unchanged) ... */}

      <div className="complaint-list">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div 
              key={complaint._id} 
              // --- CSS class no longer needs category ---
              className="complaint-card"
            >
              <h3>{complaint.title}</h3>
              <p className="complaint-user">
                Submitted by: <strong>{complaint.user?.name || 'Unknown User'} ({complaint.user?.email})</strong>
              </p>
              <p>{complaint.description}</p>
              {complaint.imageUrl && (
                <p><a href={complaint.imageUrl} target="_blank" rel="noopener noreferrer">View Image</a></p>
              )}
              <div className="complaint-meta">
                {/* --- THIS IS THE NEW CATEGORY TAG --- */}
                <span className={`category-tag ${getCategoryClass(complaint.category)}`}>
                  {complaint.category}
                </span>

                <span>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                
                <span className={`complaint-status status-${complaint.status.replace(' ', '')}`}>
                  {complaint.status}
                </span>
              </div>
              <div className="admin-controls">
                {/* ... (admin controls are unchanged) ... */}
                <label>Update Status:</label>
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p>No complaints found matching the filter.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;