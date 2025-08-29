import React, { useState } from 'react';
import './MySubmissions.css';

const MySubmissions = ({ user }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const mockSubmissions = [
    {
      id: 1,
      title: "Unity Bridges",
      description: "A vibrant mural celebrating multicultural harmony in Western Sydney",
      image: "/api/placeholder/400/300",
      status: "approved",
      project: "Western Sydney Metro",
      submissionDate: "2024-01-15",
      approvalDate: "2024-01-22",
      category: "Mural",
      location: "Bankstown Station",
      feedback: "Excellent representation of community diversity. Perfect fit for the station's aesthetic.",
      views: 1240,
      likes: 89
    },
    {
      id: 2,
      title: "Cultural Harmony",
      description: "Abstract sculpture representing the connection between traditional and modern Australia",
      image: "/api/placeholder/400/300",
      status: "pending",
      project: "Pacific Highway Upgrade",
      submissionDate: "2024-02-20",
      category: "Sculpture",
      location: "Coffs Harbour Junction",
      views: 567,
      likes: 23
    },
    {
      id: 3,
      title: "Community Voices",
      description: "Interactive digital installation showcasing local stories and memories",
      image: "/api/placeholder/400/300",
      status: "featured",
      project: "Northern Beaches Link",
      submissionDate: "2023-12-10",
      approvalDate: "2023-12-18",
      featuredDate: "2024-01-05",
      category: "Digital Art",
      location: "Mona Vale Station",
      feedback: "Outstanding community engagement. This piece has become a local landmark!",
      views: 2850,
      likes: 156
    },
    {
      id: 4,
      title: "Indigenous Connections",
      description: "Traditional dot painting honoring the indigenous heritage of the land",
      image: "/api/placeholder/400/300",
      status: "rejected",
      project: "Great Western Highway",
      submissionDate: "2024-01-30",
      rejectionDate: "2024-02-05",
      category: "Traditional Art",
      location: "Blue Mountains Crossing",
      feedback: "Beautiful artwork, but we need to ensure proper cultural consultation protocols are followed.",
      views: 334,
      likes: 12
    },
    {
      id: 5,
      title: "Ocean Dreams",
      description: "Flowing blue and teal patterns inspired by coastal waters",
      image: "/api/placeholder/400/300",
      status: "in_review",
      project: "South Coast Rail Extension",
      submissionDate: "2024-02-25",
      category: "Abstract",
      location: "Wollongong Central",
      views: 145,
      likes: 8
    }
  ];

  const filteredSubmissions = mockSubmissions.filter(submission => {
    if (filter === 'all') return true;
    return submission.status === filter;
  });

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.submissionDate) - new Date(a.submissionDate);
    } else if (sortBy === 'oldest') {
      return new Date(a.submissionDate) - new Date(b.submissionDate);
    } else if (sortBy === 'popular') {
      return b.views - a.views;
    }
    return 0;
  });

  const getStatusIcon = (status) => {
    const icons = {
      approved: '✅',
      pending: '⏳',
      featured: '⭐',
      rejected: '❌',
      in_review: '👀'
    };
    return icons[status] || '📋';
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: '#48bb78',
      pending: '#ed8936',
      featured: '#667eea',
      rejected: '#f56565',
      in_review: '#38b2ac'
    };
    return colors[status] || '#718096';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="my-submissions-page">
      <div className="submissions-container">
        <div className="submissions-header">
          <div className="header-content">
            <h1>🎨 My Artwork Submissions</h1>
            <p>Track and manage all your artwork submissions across Artaura projects</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{mockSubmissions.length}</span>
              <span className="stat-label">Total Submissions</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{mockSubmissions.filter(s => s.status === 'approved').length}</span>
              <span className="stat-label">Approved</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{mockSubmissions.filter(s => s.status === 'featured').length}</span>
              <span className="stat-label">Featured</span>
            </div>
          </div>
        </div>

        <div className="submissions-controls">
          <div className="filter-section">
            <label>Filter by Status:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Submissions</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Review</option>
              <option value="featured">Featured</option>
              <option value="in_review">In Review</option>
              <option value="rejected">Needs Revision</option>
            </select>
          </div>
          
          <div className="sort-section">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
          
          <button className="new-submission-btn">
            ➕ Submit New Artwork
          </button>
        </div>

        <div className="submissions-grid">
          {sortedSubmissions.map(submission => (
            <div key={submission.id} className="submission-card">
              <div className="submission-image">
                <img src={submission.image} alt={submission.title} />
                <div className="image-overlay">
                  <div className="engagement-stats">
                    <span>👁️ {submission.views}</span>
                    <span>❤️ {submission.likes}</span>
                  </div>
                </div>
              </div>
              
              <div className="submission-content">
                <div className="submission-header-card">
                  <h3>{submission.title}</h3>
                  <div 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(submission.status) }}
                  >
                    {getStatusIcon(submission.status)} {submission.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
                
                <p className="submission-description">{submission.description}</p>
                
                <div className="submission-details">
                  <div className="detail-item">
                    <span className="detail-icon">🏗️</span>
                    <span>{submission.project}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{submission.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🎭</span>
                    <span>{submission.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>Submitted: {formatDate(submission.submissionDate)}</span>
                  </div>
                  
                  {submission.approvalDate && (
                    <div className="detail-item">
                      <span className="detail-icon">✅</span>
                      <span>Approved: {formatDate(submission.approvalDate)}</span>
                    </div>
                  )}
                  
                  {submission.featuredDate && (
                    <div className="detail-item">
                      <span className="detail-icon">⭐</span>
                      <span>Featured: {formatDate(submission.featuredDate)}</span>
                    </div>
                  )}
                  
                  {submission.rejectionDate && (
                    <div className="detail-item">
                      <span className="detail-icon">📝</span>
                      <span>Feedback: {formatDate(submission.rejectionDate)}</span>
                    </div>
                  )}
                </div>
                
                {submission.feedback && (
                  <div className="feedback-section">
                    <h4>💬 Review Feedback:</h4>
                    <p className="feedback-text">{submission.feedback}</p>
                  </div>
                )}
                
                <div className="submission-actions">
                  <button className="action-btn view-btn">👁️ View Details</button>
                  <button className="action-btn edit-btn">✏️ Edit</button>
                  {submission.status === 'rejected' && (
                    <button className="action-btn resubmit-btn">🔄 Resubmit</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {sortedSubmissions.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎨</div>
            <h3>No submissions found</h3>
            <p>No artwork submissions match your current filter criteria.</p>
            <button className="empty-action-btn">
              ➕ Submit Your First Artwork
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;