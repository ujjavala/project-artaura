import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import absDataService from '../../services/absDataService';
import socialCohesionService from '../../services/socialCohesionService';
import './Gallery.css';

const Gallery = ({ user }) => {
  const navigate = useNavigate();
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [communityStats, setCommunityStats] = useState(null);
  const [socialImpactStats, setSocialImpactStats] = useState(null);
  const [employmentStats, setEmploymentStats] = useState(null);

  const mockArtworks = [
    {
      id: 1,
      title: 'Dreamtime Pathways',
      artist: 'Aunty Mary Nginda',
      project: 'Western Sydney Metro',
      category: 'Mural',
      status: 'Featured',
      createdAt: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&h=300&fit=crop&crop=center',
      description: 'A vibrant Aboriginal dot painting mural depicting the traditional songlines and ancestral paths across Country, connecting past and present through transport infrastructure.',
      tags: ['Aboriginal', 'Dreamtime', 'Connection'],
      likes: 245,
      views: 1420,
      location: 'Parramatta Station',
      medium: 'Traditional ochre and acrylic on concrete',
      dimensions: '15m x 4m'
    },
    {
      id: 2,
      title: 'Ocean Country',
      artist: 'Tommy Seaforth',
      project: 'Pacific Highway Upgrade',
      category: 'Sculpture',
      status: 'Approved',
      createdAt: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&crop=center',
      description: 'A flowing sculpture inspired by Indigenous totems and ocean spirits, representing the sacred connection between Aboriginal peoples and sea Country.',
      tags: ['Indigenous', 'Ocean', 'Totems'],
      likes: 189,
      views: 967,
      location: 'Mona Vale Road',
      medium: 'Carved timber and natural stones',
      dimensions: '8m x 3m x 2m'
    },
    {
      id: 3,
      title: 'Stories in Light',
      artist: 'Miriam Torres-Chen',
      project: 'Light Rail Extension',
      category: 'Digital Art',
      status: 'Approved',
      createdAt: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1741118235626-deca5a59ec2d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBwYWludGluZ3N8ZW58MHx8MHx8fDA%3D?w=400&h=300&fit=crop&crop=center',
      description: 'Interactive digital displays showcasing Aboriginal and multicultural stories through traditional patterns and contemporary technology, changing with community participation.',
      tags: ['Digital', 'Stories', 'Culture'],
      likes: 156,
      views: 834,
      location: 'Dulwich Hill Station',
      medium: 'LED panels with cultural pattern mapping',
      dimensions: '6m x 3m'
    },
    {
      id: 4,
      title: 'Bridge of Nations',
      artist: 'Koori Artist Collective',
      project: 'Harbour Bridge Maintenance',
      category: 'Installation',
      status: 'Featured',
      createdAt: '2023-12-15',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
      description: 'A powerful installation weaving together Aboriginal ochre handprints with diverse cultural symbols, celebrating 65,000+ years of Indigenous heritage alongside modern multiculturalism.',
      tags: ['Aboriginal', 'Multicultural', 'Heritage'],
      likes: 892,
      views: 4567,
      location: 'Sydney Harbour Bridge',
      medium: 'Mixed media with traditional materials',
      dimensions: '20m x 8m x 3m'
    },
    {
      id: 5,
      title: 'Welcome to Country',
      artist: 'Lisa Yamurru-Anderson',
      project: 'Airport Link Expansion',
      category: 'Mural',
      status: 'In Progress',
      createdAt: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300&h=200&fit=crop&crop=center',
      description: 'A welcoming mural featuring traditional Aboriginal art alongside symbols from Pacific Islander, Asian, African and European cultures, greeting all visitors to Country.',
      tags: ['Welcome', 'Traditional', 'Inclusive'],
      likes: 134,
      views: 678,
      location: 'Airport Link Station',
      medium: 'Natural pigments and weather-resistant acrylics',
      dimensions: '12m x 5m'
    },
    {
      id: 6,
      title: 'Country Harvest',
      artist: 'William Paterson',
      project: 'Western Sydney Metro',
      category: 'Sculpture',
      status: 'Approved',
      createdAt: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&h=300&fit=crop&crop=center',
      description: 'Sculptures representing the agricultural heritage through Aboriginal perspectives on sustainable land management, incorporating traditional hunting and gathering symbols.',
      tags: ['Aboriginal', 'Agriculture', 'Sustainability'],
      likes: 203,
      views: 1156,
      location: 'Blacktown Station',
      medium: 'Carved stone and native timber',
      dimensions: '5m x 5m x 4m'
    },
    {
      id: 7,
      title: 'Digital Ancestor Spirits',
      artist: 'Priya Wajarri-Patel',
      project: 'Light Rail Extension',
      category: 'Digital Art',
      status: 'Featured',
      createdAt: '2023-12-28',
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&crop=center',
      description: 'An immersive digital environment blending Aboriginal dot painting with Indian rangoli patterns, responding to passenger movement like ancestral spirits welcoming travelers.',
      tags: ['Aboriginal', 'Indian', 'Spirits'],
      likes: 445,
      views: 2341,
      location: 'Ashfield Station',
      medium: 'Projection mapping with cultural algorithms',
      dimensions: '10m x 15m ceiling'
    },
    {
      id: 8,
      title: 'Ancestral Tides',
      artist: 'Maria Saltwater-Martinez',
      project: 'Pacific Highway Upgrade',
      category: 'Installation',
      status: 'Approved',
      createdAt: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
      description: 'A kinetic installation inspired by Aboriginal water ceremonies and Pacific Islander navigation traditions, moving with natural rhythms like ancestral memory.',
      tags: ['Aboriginal', 'Pacific', 'Water'],
      likes: 167,
      views: 891,
      location: 'Newport Beach',
      medium: 'Natural materials and traditional weaving',
      dimensions: '6m x 4m x 8m'
    },
    {
      id: 9,
      title: 'Rainbow Bridges',
      artist: 'Alex Rainbow-Chen',
      project: 'Western Sydney Metro',
      category: 'LGBTQIA+',
      status: 'Featured',
      createdAt: '2024-01-20',
      image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGphcGFuZXNlJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D?w=400&h=300&fit=crop&crop=center',
      description: '🏳️‍🌈 A vibrant rainbow mural celebrating LGBTQIA+ pride and community connection, featuring diverse families and love stories from Western Sydney.',
      tags: ['LGBTQIA+', 'Pride', 'Community'],
      likes: 534,
      views: 3200,
      location: 'Blacktown Station',
      medium: 'Pride flag pigments and UV-resistant paints',
      dimensions: '18m x 5m'
    },
    {
      id: 10,
      title: 'Street Wisdom',
      artist: 'DJ Sprayz (Local Graffiti Artist)',
      project: 'Light Rail Extension',
      category: 'Street Art',
      status: 'Approved',
      createdAt: '2024-01-18',
      image: 'https://images.unsplash.com/photo-1578836537282-3171d77f8632?w=400&h=300&fit=crop&crop=center',
      description: '🎨 Legal street art transformation by reformed graffiti artist, teaching youth positive expression through vibrant urban storytelling.',
      tags: ['Street Art', 'Youth', 'Reformed'],
      likes: 423,
      views: 2100,
      location: 'Ashfield Station',
      medium: 'Spray paint and stencils on approved walls',
      dimensions: '12m x 4m'
    },
    {
      id: 11,
      title: 'Kids Paint the Future',
      artist: 'Little Hands Art Collective',
      project: 'Pacific Highway Upgrade',
      category: 'Kids Friendly',
      status: 'In Progress',
      createdAt: '2024-01-22',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
      description: '👶 Interactive children\'s mural painted by local school kids during field trips, featuring handprints and colorful messages of hope.',
      tags: ['Kids', 'Interactive', 'School'],
      likes: 789,
      views: 4500,
      location: 'Mona Vale Primary School Wall',
      medium: 'Kid-safe washable paints and handprints',
      dimensions: '10m x 3m'
    },
    {
      id: 12,
      title: 'Local Heroes Mosaic',
      artist: 'Parramatta Community Artists',
      project: 'Western Sydney Metro',
      category: 'Local Artists',
      status: 'Featured',
      createdAt: '2024-01-16',
      image: 'https://plus.unsplash.com/premium_photo-1668116307088-583ee0d4aaf7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D?w=400&h=300&fit=crop&crop=center',
      description: '🏘️ Community-created mosaic celebrating local heroes: teachers, nurses, shop owners, and everyday community champions.',
      tags: ['Community', 'Heroes', 'Mosaic'],
      likes: 645,
      views: 2890,
      location: 'Parramatta Community Center',
      medium: 'Recycled tiles and community contributions',
      dimensions: '8m x 6m'
    }
  ];

  useEffect(() => {
    const stats = absDataService.getGalleryStats();
    const socialStats = socialCohesionService.getGallerySocialImpact();
    const empStats = absDataService.getEmploymentOpportunities();
    setCommunityStats(stats);
    setSocialImpactStats(socialStats);
    setEmploymentStats(empStats);
  }, []);

  const categories = ['all', 'Mural', 'Sculpture', 'Digital Art', 'Installation', 'Street Art', 'Kids Friendly', 'LGBTQIA+', 'Local Artists'];
  const sortOptions = ['newest', 'oldest', 'popular', 'title'];

  const filteredAndSortedArtworks = mockArtworks
    .filter(artwork => {
      if (filterCategory === 'all') return true;
      if (filterCategory === 'Kids Friendly') return artwork.tags.includes('Kids') || artwork.tags.includes('School');
      if (filterCategory === 'LGBTQIA+') return artwork.tags.includes('LGBTQIA+') || artwork.tags.includes('Pride');
      if (filterCategory === 'Local Artists') return artwork.tags.includes('Community') || artwork.category === 'Local Artists';
      return artwork.category === filterCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'popular':
          return b.likes - a.likes;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const openArtworkDetails = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkDetails = () => {
    setSelectedArtwork(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'featured': return '#dc2626';
      case 'approved': return '#10b981';
      case 'in progress': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <Navigation />
      <div className="gallery">
        <div className="gallery-container">
        <div className="gallery-header">
          <h1>Artaura Community Gallery</h1>
          <p>Art Beyond Barriers - Discover the transformative power of art in Australia's infrastructure projects</p>
          
          <div className="fun-activities-banner">
            <h3>🎨 Fun Activities for Schools & Kids!</h3>
            <div className="activities-grid">
              <div className="activity-item">
                <span className="activity-emoji">🖌️</span>
                <div>
                  <strong>Paint with Local Artists</strong>
                  <p>School field trips where kids paint alongside community artists</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-emoji">🌈</span>
                <div>
                  <strong>Rainbow Art Sessions</strong>
                  <p>LGBTQIA+ inclusive art workshops celebrating diversity</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-emoji">🎪</span>
                <div>
                  <strong>Street Art Lessons</strong>
                  <p>Learn positive expression from reformed graffiti artists</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-emoji">📚</span>
                <div>
                  <strong>Cultural Storytelling</strong>
                  <p>Aboriginal and multicultural art history for young minds</p>
                </div>
              </div>
            </div>
            <button 
              className="book-trip-btn"
              onClick={() => navigate('/submit-artwork')}
            >
              📅 Book School Field Trip
            </button>
          </div>
          
          {communityStats && socialImpactStats && (
            <div className="community-impact-banner">
              <h3>Social Cohesion & Community Impact <small>(ABS 2024 + Scanlon Institute 2024)</small></h3>
              <div className="impact-stats-grid">
                <div className="impact-stat social-cohesion">
                  <span className="impact-number">{socialImpactStats.culturalBridgeBuilding}%</span>
                  <span className="impact-label">Enjoy Meeting Different Cultures</span>
                </div>
                <div className="impact-stat community">
                  <span className="impact-number">{socialImpactStats.communityPrideBoost}%</span>
                  <span className="impact-label">Feel Local Belonging</span>
                </div>
                <div className="impact-stat diversity">
                  <span className="impact-number">{socialImpactStats.diversityAppreciation}%</span>
                  <span className="impact-label">See Multiculture as Good</span>
                </div>
                <div className="impact-stat youth">
                  <span className="impact-number">{socialImpactStats.youthPositiveEngagement}%</span>
                  <span className="impact-label">Youth Constructive Activism</span>
                </div>
                <div className="impact-stat economic">
                  <span className="impact-number">{socialImpactStats.economicOpportunityCreation}%</span>
                  <span className="impact-label">Economic Empowerment Target</span>
                </div>
                <div className="impact-stat interfaith">
                  <span className="impact-number">{100 - socialImpactStats.interfaithUnderstanding}%</span>
                  <span className="impact-label">Interfaith Harmony Opportunity</span>
                </div>
              </div>
              <div className="impact-explanation-detailed">
                <h4>🤝 Building Social Cohesion Through Art</h4>
                <div className="cohesion-points">
                  <div className="cohesion-point">
                    <span className="cohesion-emoji">🌏</span>
                    <div>
                      <strong>Cultural Bridge-Building:</strong> Our artworks create shared experiences for the <strong>{socialImpactStats.culturalBridgeBuilding}%</strong> who 
                      enjoy meeting people from different cultures, directly addressing immigration concerns reported by 49% of Australians.
                    </div>
                  </div>
                  <div className="cohesion-point">
                    <span className="cohesion-emoji">💪</span>
                    <div>
                      <strong>Economic Empowerment:</strong> We provide skills and employment opportunities for the <strong>{socialImpactStats.economicOpportunityCreation}%</strong> 
                      of Australians struggling financially, addressing the top concern of 49% who cite economy as Australia's biggest issue.
                    </div>
                  </div>
                  <div className="cohesion-point">
                    <span className="cohesion-emoji">⚡</span>
                    <div>
                      <strong>Youth Engagement:</strong> We channel the activism energy of <strong>{socialImpactStats.youthPositiveEngagement}%</strong> of young adults 
                      into constructive community building, fostering positive social change through creativity.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {employmentStats && (
            <div className="employment-impact-banner">
              <h3>💼 Employment & Workforce Diversity Impact <small>(ABS July 2024)</small></h3>
              <p className="section-description">
                How Artaura creates employment opportunities and addresses workforce participation gaps
              </p>
              
              <div className="employment-stats-grid">
                <div className="employment-stat overall">
                  <div className="employment-icon">👥</div>
                  <div className="employment-content">
                    <h3>{employmentStats.totalEmploymentRate}%</h3>
                    <p>Overall Employment Rate</p>
                    <small>Stable employment opportunities through art</small>
                  </div>
                </div>
                
                <div className="employment-stat female">
                  <div className="employment-icon">♀️</div>
                  <div className="employment-content">
                    <h3>+{employmentStats.femaleEmploymentGrowth}pp</h3>
                    <p>Female Employment Growth (20 years)</p>
                    <small>Prioritizing female artists and leadership</small>
                  </div>
                </div>
                
                <div className="employment-stat disability">
                  <div className="employment-icon">♿</div>
                  <div className="employment-content">
                    <h3>{employmentStats.diversityTargets.disabilityInclusion}%</h3>
                    <p>Disability Employment Rate</p>
                    <small>Up from 47.8% in 2018 to 56.1% in 2022</small>
                  </div>
                </div>
                
                <div className="employment-stat indigenous">
                  <div className="employment-icon">🪃</div>
                  <div className="employment-content">
                    <h3>{employmentStats.diversityTargets.indigenousEngagement}%</h3>
                    <p>Indigenous Employment Rate</p>
                    <small>Growing from 51.0% to 55.7% (2016-2021)</small>
                  </div>
                </div>
                
                <div className="employment-stat payequity">
                  <div className="employment-icon">💰</div>
                  <div className="employment-content">
                    <h3>{employmentStats.genderPayGap}%</h3>
                    <p>Gender Pay Gap</p>
                    <small>Down from 15.2% (2004) to 11.5% (2024)</small>
                  </div>
                </div>
                
                <div className="employment-stat participation">
                  <div className="employment-icon">📈</div>
                  <div className="employment-content">
                    <h3>{employmentStats.participationRate}%</h3>
                    <p>Workforce Participation</p>
                    <small>Creating pathways to meaningful work</small>
                  </div>
                </div>
              </div>
              
              <div className="employment-explanation">
                <h3>🎯 Our Employment Commitments</h3>
                <div className="employment-points-grid">
                  <div className="employment-point">
                    <span className="employment-emoji">👩‍🎨</span>
                    <h4>Female Artist Priority</h4>
                    <p>Targeting {employmentStats.diversityTargets.femaleParticipation}% female participation to match workforce trends and close employment gaps.</p>
                  </div>
                  <div className="employment-point">
                    <span className="employment-emoji">🌐</span>
                    <h4>Disability Inclusion</h4>
                    <p>Creating accessible opportunities for the {employmentStats.diversityTargets.disabilityInclusion}% employment rate to grow further.</p>
                  </div>
                  <div className="employment-point">
                    <span className="employment-emoji">🏛️</span>
                    <h4>Indigenous Engagement</h4>
                    <p>Honoring First Nations artists and working to increase the {employmentStats.diversityTargets.indigenousEngagement}% employment rate.</p>
                  </div>
                  <div className="employment-point">
                    <span className="employment-emoji">⚖️</span>
                    <h4>Pay Equity</h4>
                    <p>Committed to fair compensation, working to eliminate the remaining {employmentStats.genderPayGap}% gender pay gap.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="gallery-controls">
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="categoryFilter">Category:</label>
              <select 
                id="categoryFilter"
                className="filter-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="sortSelect">Sort by:</label>
              <select 
                id="sortSelect"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Liked</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
          
          <div className="gallery-stats">
            {filteredAndSortedArtworks.length} artwork{filteredAndSortedArtworks.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="artworks-grid">
          {filteredAndSortedArtworks.map(artwork => (
            <div key={artwork.id} className="artwork-card" onClick={() => openArtworkDetails(artwork)}>
              <div className="artwork-image">
                <img src={artwork.image} alt={artwork.title} />
                <div className="artwork-overlay">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(artwork.status) }}
                  >
                    {artwork.status}
                  </span>
                  <div className="artwork-stats">
                    <span>❤️ {artwork.likes}</span>
                    <span>👁️ {artwork.views}</span>
                  </div>
                </div>
              </div>
              
              <div className="artwork-content">
                <h3>{artwork.title}</h3>
                <p className="artwork-artist">by {artwork.artist}</p>
                <p className="artwork-project">{artwork.project}</p>
                
                <div className="artwork-tags">
                  {artwork.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="artwork-tag">{tag}</span>
                  ))}
                  {artwork.tags.length > 2 && (
                    <span className="artwork-tag">+{artwork.tags.length - 2}</span>
                  )}
                </div>
                
                <div className="artwork-meta">
                  <span className="artwork-category">{artwork.category}</span>
                  <span className="artwork-date">{formatDate(artwork.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedArtwork && (
          <div className="artwork-modal-overlay" onClick={closeArtworkDetails}>
            <div className="artwork-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeArtworkDetails}>×</button>
              
              <div className="modal-image">
                <img src={selectedArtwork.image} alt={selectedArtwork.title} />
                <div className="modal-image-overlay">
                  <span 
                    className="status-badge large" 
                    style={{ backgroundColor: getStatusColor(selectedArtwork.status) }}
                  >
                    {selectedArtwork.status}
                  </span>
                </div>
              </div>
              
              <div className="modal-content">
                <div className="modal-header-info">
                  <h2>{selectedArtwork.title}</h2>
                  <p className="modal-artist">by {selectedArtwork.artist}</p>
                  <p className="modal-project">Part of {selectedArtwork.project}</p>
                </div>
                
                <div className="modal-description">
                  <h3>About This Artwork</h3>
                  <p>{selectedArtwork.description}</p>
                </div>
                
                <div className="modal-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{selectedArtwork.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Medium</span>
                    <span className="detail-value">{selectedArtwork.medium}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Dimensions</span>
                    <span className="detail-value">{selectedArtwork.dimensions}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">{selectedArtwork.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Created</span>
                    <span className="detail-value">{formatDate(selectedArtwork.createdAt)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Engagement</span>
                    <span className="detail-value">{selectedArtwork.likes} likes • {selectedArtwork.views} views</span>
                  </div>
                </div>
                
                <div className="modal-tags">
                  <h3>Tags</h3>
                  <div className="artwork-tags">
                    {selectedArtwork.tags.map(tag => (
                      <span key={tag} className="artwork-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="btn btn-primary">
                    ❤️ Like This Artwork
                  </button>
                  <button className="btn btn-secondary">
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Gallery;