import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    specialties: user?.specialties || [],
    experience: user?.experience || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const mockArtworks = [
    {
      id: 1,
      title: "Unity Bridges",
      image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&h=300&fit=crop&crop=center',
      status: "approved",
      project: "Western Sydney Metro",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Cultural Harmony",
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&crop=center',
      status: "pending",
      project: "Pacific Highway Upgrade",
      date: "2024-02-20"
    },
    {
      id: 3,
      title: "Community Voices",
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
      status: "featured",
      project: "Northern Beaches Link",
      date: "2023-12-10"
    }
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name || user.username} />
              ) : (
                <span className="avatar-initial-large">
                  {(user?.name || user?.username)?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <button className="change-photo-btn">📷 Change Photo</button>
          </div>
          
          <div className="profile-info-section">
            <h1 className="profile-title">My Profile & Portfolio</h1>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Artworks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Approved</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Featured</span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button 
              className="edit-profile-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '✏️ Save Changes' : '✏️ Edit Profile'}
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-details">
            <h2>🎨 Artist Information</h2>
            
            {isEditing ? (
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about your artistic journey and inspiration"
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Your location (e.g., Sydney, NSW)"
                  />
                </div>
                
                <div className="form-group">
                  <label>Experience Level</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (3-7 years)</option>
                    <option value="advanced">Advanced (8-15 years)</option>
                    <option value="professional">Professional (15+ years)</option>
                  </select>
                </div>
                
                <button className="save-btn" onClick={handleSave}>
                  💾 Save Profile
                </button>
              </div>
            ) : (
              <div className="profile-display">
                <div className="info-item">
                  <span className="info-label">📧 Email:</span>
                  <span className="info-value">{user?.email || 'Not provided'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">🏢 Division:</span>
                  <span className="info-value">{user?.division || 'Community Artist'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">📍 Location:</span>
                  <span className="info-value">{formData.location || 'Not specified'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">🎯 Experience:</span>
                  <span className="info-value">{formData.experience || 'Not specified'}</span>
                </div>
                
                <div className="info-item bio-item">
                  <span className="info-label">✨ Bio:</span>
                  <p className="bio-text">
                    {formData.bio || 'Welcome to Artaura! Share your artistic story and connect with the community through infrastructure art projects across Australia.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="portfolio-section">
            <h2>🖼️ My Portfolio</h2>
            <div className="portfolio-grid">
              {mockArtworks.map(artwork => (
                <div key={artwork.id} className="portfolio-item">
                  <div className="portfolio-image">
                    <img src={artwork.image} alt={artwork.title} />
                    <div className={`status-badge ${artwork.status}`}>
                      {artwork.status === 'approved' && '✅ Approved'}
                      {artwork.status === 'pending' && '⏳ Pending'}
                      {artwork.status === 'featured' && '⭐ Featured'}
                    </div>
                  </div>
                  <div className="portfolio-details">
                    <h3>{artwork.title}</h3>
                    <p className="project-name">🏗️ {artwork.project}</p>
                    <p className="submission-date">📅 {artwork.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="portfolio-actions">
              <button className="add-artwork-btn">
                ➕ Add New Artwork
              </button>
              <button className="view-all-btn">
                👀 View All Submissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;