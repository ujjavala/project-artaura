import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navigation">
      <div className="navigation-container">
        <button
          className={`nav-tab ${location.pathname === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <span className="tab-icon">📊</span>
          Overview
        </button>
        <button
          className={`nav-tab ${location.pathname === '/projects' ? 'active' : ''}`}
          onClick={() => navigate('/projects')}
        >
          <span className="tab-icon">🏗️</span>
          Projects
        </button>
        <button
          className={`nav-tab ${location.pathname === '/submit-artwork' ? 'active' : ''}`}
          onClick={() => navigate('/submit-artwork')}
        >
          <span className="tab-icon">🎨</span>
          Submit Artwork
        </button>
        <button
          className={`nav-tab ${location.pathname === '/gallery' ? 'active' : ''}`}
          onClick={() => navigate('/gallery')}
        >
          <span className="tab-icon">🖼️</span>
          Gallery
        </button>
        <button
          className={`nav-tab ${location.pathname === '/social-impact' ? 'active' : ''}`}
          onClick={() => navigate('/social-impact')}
        >
          <span className="tab-icon">🤝</span>
          Social Impact
        </button>
        <button
          className={`nav-tab ${location.pathname === '/ai-art-analyzer' ? 'active' : ''}`}
          onClick={() => navigate('/ai-art-analyzer')}
        >
          <span className="tab-icon">🤖</span>
          AI Art Analyzer
        </button>
        <button
          className={`nav-tab ${location.pathname === '/ai-community-matcher' ? 'active' : ''}`}
          onClick={() => navigate('/ai-community-matcher')}
        >
          <span className="tab-icon">🧠</span>
          AI Community
        </button>
      </div>
    </div>
  );
};

export default Navigation;