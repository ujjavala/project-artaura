import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock notifications with art-focused content
    setNotifications([
      {
        id: 1,
        type: 'submission',
        title: 'New artwork approved!',
        message: 'Your "Unity Bridges" submission has been approved for the Western Sydney Metro project.',
        time: '2 hours ago',
        icon: '🎨',
        unread: true
      },
      {
        id: 2,
        type: 'project',
        title: 'New project available',
        message: 'Pacific Highway Upgrade is now accepting community art submissions.',
        time: '5 hours ago',
        icon: '🚧',
        unread: true
      },
      {
        id: 3,
        type: 'community',
        title: 'Community showcase',
        message: 'Featured in this week\'s community spotlight: "Multicultural Harmony" series.',
        time: '1 day ago',
        icon: '🌟',
        unread: false
      }
    ]);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById('header-search')?.focus(), 100);
    }
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    onLogout();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <span className="logo-text">🎨Artaura</span>
          </div>
          
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button 
              className="nav-link active"
              onClick={() => navigate('/dashboard')}
            >
              <span className="nav-icon">🏠</span>
              My Dashboard
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/projects')}
            >
              <span className="nav-icon">🏗️</span>
              Browse Projects
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/submit-artwork')}
            >
              <span className="nav-icon">📤</span>
              Submit My Art
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/gallery')}
            >
              <span className="nav-icon">🖼️</span>
              Community Gallery
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/social-impact')}
            >
              <span className="nav-icon">🤝</span>
              Impact Overview
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/ai-art-analyzer')}
            >
              <span className="nav-icon">🤖</span>
              AI Art Analyzer
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/ai-community-matcher')}
            >
              <span className="nav-icon">🔗</span>
              AI Community Matcher
            </button>
          </nav>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <div className="notification-container">
              <button 
                className={`action-btn notification-btn ${isNotificationOpen ? 'active' : ''}`} 
                onClick={toggleNotifications}
                title="Notifications"
              >
                <span className={`notification-icon ${unreadCount > 0 ? 'has-unread' : ''}`}>🔔</span>
              </button>
              
              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>🎨 Artaura Updates</h4>
                    <button 
                      className="mark-all-read-btn"
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.unread ? 'unread' : ''}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="notification-icon">{notification.icon}</div>
                        <div className="notification-content">
                          <h5 className="notification-title">{notification.title}</h5>
                          <p className="notification-message">{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                        {notification.unread && <div className="unread-indicator"></div>}
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button 
                      className="view-all-link"
                      onClick={() => { setIsNotificationOpen(false); navigate('/notifications'); }}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="search-container">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  id="header-search"
                  type="text"
                  placeholder="Search artworks, projects, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-submit-btn">
                  <span>🔍</span>
                </button>
              </form>
            </div>
          )}


          <div className="user-profile">
            <button 
              className="profile-btn" 
              onClick={toggleProfile}
              title={`${user?.name || user?.username} - Click to open menu`}
            >
              <div className="profile-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name || user.username} />
                ) : (
                  <span className="avatar-initial">
                    {(user?.name || user?.username)?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="profile-info">
                <span className="profile-name">{user?.name || user?.username}</span>
                <span className="profile-role">{user?.division}</span>
              </div>
              <span className="profile-arrow">▼</span>
            </button>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name || user.username} />
                    ) : (
                      <span className="avatar-initial">
                        {(user?.name || user?.username)?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="dropdown-info">
                    <p className="dropdown-name">{user?.name || user?.username}</p>
                    <p className="dropdown-email">{user?.email}</p>
                    <p className="dropdown-division">{user?.division}</p>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-menu">
                  <button 
                    className="dropdown-item"
                    onClick={() => { setIsProfileOpen(false); navigate('/profile'); }}
                  >
                    <span className="dropdown-icon">👤</span>
                    My Profile & Portfolio
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => { setIsProfileOpen(false); navigate('/my-submissions'); }}
                  >
                    <span className="dropdown-icon">🎨</span>
                    My Artwork Submissions
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => { setIsProfileOpen(false); navigate('/my-favorites'); }}
                  >
                    <span className="dropdown-icon">❤️</span>
                    My Favorite Artworks
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => { setIsProfileOpen(false); navigate('/artist-network'); }}
                  >
                    <span className="dropdown-icon">👥</span>
                    My Artist Network
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => { setIsProfileOpen(false); navigate('/my-impact'); }}
                  >
                    <span className="dropdown-icon">📊</span>
                    My Social Impact Stats
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => { setIsProfileOpen(false); navigate('/settings'); }}
                  >
                    <span className="dropdown-icon">⚙️</span>
                    Account Settings
                  </button>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="mobile-nav-overlay" onClick={toggleMenu}>
          <nav className="mobile-nav">
            <div className="mobile-nav-header">
              <div className="mobile-nav-user">
                <div className="mobile-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name || user.username} />
                  ) : (
                    <span className="avatar-initial">
                      {(user?.name || user?.username)?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="mobile-user-info">
                  <span className="mobile-user-name">{user?.name || user?.username}</span>
                  <span className="mobile-user-role">{user?.division || 'Community Artist'}</span>
                </div>
              </div>
            </div>
            <div className="mobile-nav-divider"></div>
            <button 
              className="mobile-nav-link active"
              onClick={() => { setIsMenuOpen(false); navigate('/dashboard'); }}
            >
              <span className="mobile-nav-icon">🏠</span>
              My Dashboard
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/projects'); }}
            >
              <span className="mobile-nav-icon">🏗️</span>
              Browse Projects
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/submit-artwork'); }}
            >
              <span className="mobile-nav-icon">📤</span>
              Submit My Artwork
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/gallery'); }}
            >
              <span className="mobile-nav-icon">🖼️</span>
              Community Gallery
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/social-impact'); }}
            >
              <span className="mobile-nav-icon">🤝</span>
              Impact Overview
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/ai-art-analyzer'); }}
            >
              <span className="mobile-nav-icon">🤖</span>
              AI Art Analyzer
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/ai-community-matcher'); }}
            >
              <span className="mobile-nav-icon">🔗</span>
              AI Community Matcher
            </button>
            <div className="mobile-nav-divider"></div>
            <div className="mobile-nav-section-title">My Account</div>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/my-submissions'); }}
            >
              <span className="mobile-nav-icon">🎨</span>
              My Submissions
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/my-favorites'); }}
            >
              <span className="mobile-nav-icon">❤️</span>
              My Favorites
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/my-impact'); }}
            >
              <span className="mobile-nav-icon">📊</span>
              My Impact Stats
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/settings'); }}
            >
              <span className="mobile-nav-icon">⚙️</span>
              Account Settings
            </button>
            <div className="mobile-nav-divider"></div>
            <button 
              className="mobile-nav-link"
              onClick={() => { setIsMenuOpen(false); navigate('/help'); }}
            >
              <span className="mobile-nav-icon">❓</span>
              Help & Support
            </button>
            <button className="mobile-nav-link logout-link" onClick={handleLogout}>
              <span className="mobile-nav-icon">🚪</span>
              Sign Out
            </button>
          </nav>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {isProfileOpen && (
        <div className="profile-backdrop" onClick={() => setIsProfileOpen(false)}></div>
      )}
      {isNotificationOpen && (
        <div className="notifications-backdrop" onClick={() => setIsNotificationOpen(false)}></div>
      )}
      {isSearchOpen && (
        <div className="search-backdrop" onClick={() => setIsSearchOpen(false)}></div>
      )}
    </header>
  );
};

export default Header;