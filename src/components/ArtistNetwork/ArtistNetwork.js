import React, { useState } from 'react';
import './ArtistNetwork.css';

const ArtistNetwork = ({ user }) => {
  const [activeTab, setActiveTab] = useState('following');
  const [searchQuery, setSearchQuery] = useState('');

  const mockFollowing = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/api/placeholder/80/80",
      location: "Sydney, NSW",
      specialty: "Watercolor & Digital Art",
      followers: 1240,
      artworks: 28,
      featured: 5,
      isFollowing: true,
      mutualConnections: 12,
      recentWork: "Harbor Dreams - Sydney Harbor Bridge",
      joinDate: "2023-05-15"
    },
    {
      id: 2,
      name: "Michael Tjandrawati",
      avatar: "/api/placeholder/80/80",
      location: "Blue Mountains, NSW",
      specialty: "Indigenous Traditional Art",
      followers: 890,
      artworks: 15,
      featured: 8,
      isFollowing: true,
      mutualConnections: 8,
      recentWork: "Cultural Connections - Great Western Highway",
      joinDate: "2023-03-10"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "/api/placeholder/80/80",
      location: "Parramatta, NSW",
      specialty: "Interactive Digital Installations",
      followers: 2150,
      artworks: 42,
      featured: 12,
      isFollowing: true,
      mutualConnections: 23,
      recentWork: "Digital Harmony - Metro West Line",
      joinDate: "2022-11-20"
    }
  ];

  const mockFollowers = [
    {
      id: 4,
      name: "James Wong",
      avatar: "/api/placeholder/80/80",
      location: "Northern Beaches, NSW",
      specialty: "Textile & Fabric Art",
      followers: 567,
      artworks: 22,
      featured: 3,
      isFollowing: false,
      mutualConnections: 5,
      recentWork: "Community Tapestry - Northern Beaches Link",
      joinDate: "2023-08-05"
    },
    {
      id: 5,
      name: "Priya Sharma",
      avatar: "/api/placeholder/80/80",
      location: "Mount Druitt, NSW",
      specialty: "Sculpture & Mixed Media",
      followers: 733,
      artworks: 19,
      featured: 4,
      isFollowing: true,
      mutualConnections: 7,
      recentWork: "Urban Forest - Western Sydney Parkway",
      joinDate: "2023-06-12"
    },
    {
      id: 6,
      name: "David Kim",
      avatar: "/api/placeholder/80/80",
      location: "Wollongong, NSW",
      specialty: "Mosaic & Ceramic Art",
      followers: 423,
      artworks: 16,
      featured: 2,
      isFollowing: false,
      mutualConnections: 3,
      recentWork: "Ocean Waves - South Coast Extension",
      joinDate: "2023-09-18"
    }
  ];

  const mockSuggested = [
    {
      id: 7,
      name: "Lisa Anderson",
      avatar: "/api/placeholder/80/80",
      location: "Cronulla, NSW",
      specialty: "Street Art & Murals",
      followers: 1890,
      artworks: 35,
      featured: 9,
      isFollowing: false,
      mutualConnections: 15,
      recentWork: "Coastal Stories - Cronulla Line Extension",
      joinDate: "2022-12-03",
      reason: "Similar artistic style"
    },
    {
      id: 8,
      name: "Robert Johnson",
      avatar: "/api/placeholder/80/80",
      location: "Blacktown, NSW",
      specialty: "Photography & Light Art",
      followers: 1156,
      artworks: 41,
      featured: 6,
      isFollowing: false,
      mutualConnections: 9,
      recentWork: "Light Patterns - Western Metro Upgrade",
      joinDate: "2023-01-15",
      reason: "Works on similar projects"
    },
    {
      id: 9,
      name: "Maria Gonzalez",
      avatar: "/api/placeholder/80/80",
      location: "Liverpool, NSW",
      specialty: "Community Collaborative Art",
      followers: 2340,
      artworks: 28,
      featured: 11,
      isFollowing: false,
      mutualConnections: 18,
      recentWork: "Voices United - South West Rail Link",
      joinDate: "2022-08-22",
      reason: "Popular in your network"
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'following':
        return mockFollowing;
      case 'followers':
        return mockFollowers;
      case 'discover':
        return mockSuggested;
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const followUser = (userId) => {
    console.log('Following user:', userId);
  };

  const unfollowUser = (userId) => {
    console.log('Unfollowing user:', userId);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'following':
        return 'Artists I Follow';
      case 'followers':
        return 'My Followers';
      case 'discover':
        return 'Discover New Artists';
      default:
        return '';
    }
  };

  const getTabCount = () => {
    switch (activeTab) {
      case 'following':
        return mockFollowing.length;
      case 'followers':
        return mockFollowers.length;
      case 'discover':
        return mockSuggested.length;
      default:
        return 0;
    }
  };

  return (
    <div className="artist-network-page">
      <div className="network-container">
        <div className="network-header">
          <div className="header-content">
            <h1>👥 My Artist Network</h1>
            <p>Connect with fellow artists and discover inspiring creators across Australia</p>
          </div>
          
          <div className="network-stats">
            <div className="stat-item">
              <span className="stat-number">{mockFollowing.length}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{mockFollowers.length}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{mockFollowing.reduce((acc, artist) => acc + artist.mutualConnections, 0)}</span>
              <span className="stat-label">Connections</span>
            </div>
          </div>
        </div>

        <div className="network-controls">
          <div className="tab-navigation">
            <button 
              className={activeTab === 'following' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('following')}
            >
              👤 Following ({mockFollowing.length})
            </button>
            <button 
              className={activeTab === 'followers' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('followers')}
            >
              👥 Followers ({mockFollowers.length})
            </button>
            <button 
              className={activeTab === 'discover' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('discover')}
            >
              🔍 Discover ({mockSuggested.length})
            </button>
          </div>
          
          <div className="search-section">
            <div className="search-input-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search artists by name, location, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="tab-content">
          <div className="tab-header">
            <h2>{getTabTitle()}</h2>
            <span className="result-count">{filteredData.length} {filteredData.length === 1 ? 'artist' : 'artists'}</span>
          </div>
          
          <div className="artists-grid">
            {filteredData.map(artist => (
              <div key={artist.id} className="artist-card">
                <div className="artist-header">
                  <div className="artist-avatar">
                    <img src={artist.avatar} alt={artist.name} />
                  </div>
                  <div className="artist-basic-info">
                    <h3>{artist.name}</h3>
                    <p className="artist-location">📍 {artist.location}</p>
                    <p className="artist-specialty">🎨 {artist.specialty}</p>
                  </div>
                  <div className="follow-btn-container">
                    {activeTab === 'following' || artist.isFollowing ? (
                      <button 
                        className="follow-btn following"
                        onClick={() => unfollowUser(artist.id)}
                      >
                        ✓ Following
                      </button>
                    ) : (
                      <button 
                        className="follow-btn"
                        onClick={() => followUser(artist.id)}
                      >
                        ➕ Follow
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="artist-stats">
                  <div className="stat">
                    <span className="stat-number">{artist.followers}</span>
                    <span className="stat-label">Followers</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{artist.artworks}</span>
                    <span className="stat-label">Artworks</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{artist.featured}</span>
                    <span className="stat-label">Featured</span>
                  </div>
                </div>
                
                <div className="artist-details">
                  <div className="recent-work">
                    <span className="label">🎨 Recent Work:</span>
                    <span className="value">{artist.recentWork}</span>
                  </div>
                  
                  <div className="mutual-connections">
                    <span className="label">🤝 Mutual Connections:</span>
                    <span className="value">{artist.mutualConnections} artists</span>
                  </div>
                  
                  <div className="join-date">
                    <span className="label">📅 Joined:</span>
                    <span className="value">{new Date(artist.joinDate).toLocaleDateString('en-AU', { year: 'numeric', month: 'short' })}</span>
                  </div>
                  
                  {artist.reason && (
                    <div className="suggestion-reason">
                      <span className="label">💡 Suggested because:</span>
                      <span className="value reason">{artist.reason}</span>
                    </div>
                  )}
                </div>
                
                <div className="artist-actions">
                  <button className="action-btn view-profile">👤 View Profile</button>
                  <button className="action-btn view-artworks">🖼️ View Artworks</button>
                  <button className="action-btn send-message">💬 Message</button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredData.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No artists found</h3>
              <p>No artists match your search criteria. Try adjusting your search terms or explore different categories.</p>
              <button className="empty-action-btn" onClick={() => setSearchQuery('')}>
                🔄 Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistNetwork;