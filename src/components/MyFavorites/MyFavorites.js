import React, { useState } from 'react';
import './MyFavorites.css';

const MyFavorites = ({ user }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const mockFavorites = [
    {
      id: 1,
      title: "Harbor Dreams",
      artist: "Sarah Chen",
      artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&h=300&fit=crop&crop=center',
      project: "Sydney Harbor Bridge Renewal",
      location: "Circular Quay",
      category: "Mural",
      dateAdded: "2024-02-15",
      likes: 245,
      description: "A stunning watercolor-style mural capturing the essence of Sydney's harbor at sunrise",
      tags: ["harbor", "sunrise", "watercolor", "sydney"]
    },
    {
      id: 2,
      title: "Indigenous Connections",
      artist: "Michael Tjandrawati",
      artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&crop=center',
      project: "Great Western Highway",
      location: "Blue Mountains",
      category: "Traditional Art",
      dateAdded: "2024-02-10",
      likes: 189,
      description: "Traditional dot painting celebrating the indigenous heritage of the Blue Mountains region",
      tags: ["indigenous", "traditional", "heritage", "mountains"]
    },
    {
      id: 3,
      title: "Digital Harmony",
      artist: "Elena Rodriguez",
      artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e0a9a5?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1741118235626-deca5a59ec2d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBwYWludGluZ3N8ZW58MHx8MHx8fDA%3D?w=400&h=300&fit=crop&crop=center',
      project: "Metro West Line",
      location: "Parramatta Station",
      category: "Digital Installation",
      dateAdded: "2024-02-05",
      likes: 312,
      description: "Interactive LED installation that responds to commuter movement and creates flowing light patterns",
      tags: ["digital", "interactive", "led", "technology"]
    },
    {
      id: 4,
      title: "Community Tapestry",
      artist: "James Wong",
      artistAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
      project: "Northern Beaches Link",
      location: "Manly Junction",
      category: "Textile Art",
      dateAdded: "2024-01-28",
      likes: 167,
      description: "Large-scale textile installation representing the diverse communities of the Northern Beaches",
      tags: ["textile", "community", "diverse", "beaches"]
    },
    {
      id: 5,
      title: "Urban Forest",
      artist: "Priya Sharma",
      artistAvatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300&h=200&fit=crop&crop=center',
      project: "Western Sydney Parkway",
      location: "Mount Druitt",
      category: "Sculpture",
      dateAdded: "2024-01-20",
      likes: 203,
      description: "Metal and glass sculpture creating the illusion of trees growing through concrete infrastructure",
      tags: ["sculpture", "nature", "urban", "sustainability"]
    },
    {
      id: 6,
      title: "Ocean Waves",
      artist: "David Kim",
      artistAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1578836537282-3171d77f8632?w=400&h=300&fit=crop&crop=center',
      project: "South Coast Extension",
      location: "Wollongong",
      category: "Mosaic",
      dateAdded: "2024-01-15",
      likes: 134,
      description: "Flowing mosaic artwork inspired by the patterns of ocean waves and coastal erosion",
      tags: ["mosaic", "ocean", "waves", "coastal"]
    }
  ];

  const filteredFavorites = mockFavorites.filter(favorite => {
    if (filter === 'all') return true;
    return favorite.category.toLowerCase().replace(' ', '_') === filter;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    } else if (sortBy === 'oldest') {
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    } else if (sortBy === 'popular') {
      return b.likes - a.likes;
    } else if (sortBy === 'artist') {
      return a.artist.localeCompare(b.artist);
    }
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const removeFavorite = (id) => {
    console.log('Removing favorite:', id);
  };

  const shareArtwork = (artwork) => {
    console.log('Sharing artwork:', artwork.title);
  };

  const categories = [...new Set(mockFavorites.map(f => f.category))];

  return (
    <div className="my-favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <div className="header-content">
            <h1>❤️ My Favorite Artworks</h1>
            <p>Discover and curate your personal collection of inspiring community art</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{mockFavorites.length}</span>
              <span className="stat-label">Artworks Saved</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{new Set(mockFavorites.map(f => f.artist)).size}</span>
              <span className="stat-label">Artists</span>
            </div>
          </div>
        </div>

        <div className="favorites-controls">
          <div className="left-controls">
            <div className="filter-section">
              <label>Filter by Category:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase().replace(' ', '_')}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="sort-section">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Recently Added</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Liked</option>
                <option value="artist">Artist Name</option>
              </select>
            </div>
          </div>
          
          <div className="right-controls">
            <div className="view-toggle">
              <button 
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                ⊞
              </button>
              <button 
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        <div className={`favorites-grid ${viewMode}`}>
          {sortedFavorites.map(favorite => (
            <div key={favorite.id} className="favorite-card">
              <div className="favorite-image">
                <img src={favorite.image} alt={favorite.title} />
                <div className="image-overlay">
                  <div className="overlay-actions">
                    <button 
                      className="action-btn share-btn"
                      onClick={() => shareArtwork(favorite)}
                      title="Share artwork"
                    >
                      🔗
                    </button>
                    <button 
                      className="action-btn remove-btn"
                      onClick={() => removeFavorite(favorite.id)}
                      title="Remove from favorites"
                    >
                      💔
                    </button>
                  </div>
                  <div className="overlay-info">
                    <span className="likes-count">❤️ {favorite.likes}</span>
                  </div>
                </div>
              </div>
              
              <div className="favorite-content">
                <div className="favorite-header-card">
                  <h3>{favorite.title}</h3>
                  <span className="category-tag">{favorite.category}</span>
                </div>
                
                <div className="artist-info">
                  <div className="artist-avatar">
                    <img src={favorite.artistAvatar} alt={favorite.artist} />
                  </div>
                  <div className="artist-details">
                    <span className="artist-name">👨‍🎨 {favorite.artist}</span>
                    <span className="added-date">💾 Added {formatDate(favorite.dateAdded)}</span>
                  </div>
                </div>
                
                <p className="favorite-description">{favorite.description}</p>
                
                <div className="project-info">
                  <div className="info-item">
                    <span className="info-icon">🏗️</span>
                    <span>{favorite.project}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <span>{favorite.location}</span>
                  </div>
                </div>
                
                <div className="tags-container">
                  {favorite.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
                
                <div className="favorite-actions">
                  <button className="action-btn view-btn">👁️ View Full Details</button>
                  <button className="action-btn visit-btn">📍 Visit Location</button>
                  <button className="action-btn artist-btn">👨‍🎨 View Artist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {sortedFavorites.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💔</div>
            <h3>No favorites found</h3>
            <p>No artworks match your current filter criteria. Try adjusting your filters or browse the gallery to find inspiring artworks to save.</p>
            <button className="empty-action-btn">
              🖼️ Explore Community Gallery
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;