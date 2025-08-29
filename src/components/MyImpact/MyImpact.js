import React, { useState } from 'react';
import './MyImpact.css';

const MyImpact = ({ user }) => {
  const [timeframe, setTimeframe] = useState('all');
  const [activeMetric, setActiveMetric] = useState('overview');

  const impactData = {
    overview: {
      totalArtworks: 12,
      approvedArtworks: 8,
      featuredArtworks: 3,
      totalViews: 15847,
      totalLikes: 1248,
      totalComments: 324,
      projectsParticipated: 6,
      communitiesReached: 4,
      socialScore: 87
    },
    engagement: {
      averageViews: 1320,
      averageLikes: 104,
      averageComments: 27,
      engagementRate: 8.3,
      sharesTotalCount: 156,
      savedByUsers: 89,
      followersGained: 234
    },
    community: {
      communitiesImpacted: [
        { name: "Western Sydney", artworks: 4, engagement: 4200 },
        { name: "Northern Beaches", artworks: 2, engagement: 2800 },
        { name: "Blue Mountains", artworks: 1, engagement: 1900 },
        { name: "South Coast", artworks: 1, engagement: 1500 }
      ],
      collaborations: 3,
      mentorshipHours: 24,
      workshopsAttended: 7,
      communityEvents: 5
    },
    recognition: {
      featuredTimes: 3,
      awards: 1,
      mediaFeatures: 2,
      testimonials: 5,
      influencerShares: 12,
      governmentRecognition: 1
    }
  };

  const recentActivity = [
    {
      id: 1,
      type: 'featured',
      title: 'Your artwork "Unity Bridges" was featured in the community showcase',
      date: '2024-02-20',
      impact: '+500 views, +45 likes',
      icon: '⭐'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Cultural Harmony artwork approved for Pacific Highway project',
      date: '2024-02-18',
      impact: 'Reaching 15,000+ daily commuters',
      icon: '✅'
    },
    {
      id: 3,
      type: 'engagement',
      title: 'Your Digital Dreams artwork received 100+ likes',
      date: '2024-02-15',
      impact: '+12 new followers',
      icon: '❤️'
    },
    {
      id: 4,
      type: 'collaboration',
      title: 'Invited to collaborate on Metro West Line project',
      date: '2024-02-12',
      impact: 'Multi-artist community initiative',
      icon: '🤝'
    },
    {
      id: 5,
      type: 'recognition',
      title: 'Featured in Australia social media campaign',
      date: '2024-02-10',
      impact: '50K+ social media reach',
      icon: '📺'
    }
  ];

  const monthlyStats = [
    { month: 'Jan 2024', views: 2400, likes: 180, submissions: 2 },
    { month: 'Feb 2024', views: 3200, likes: 245, submissions: 3 },
    { month: 'Mar 2024', views: 2800, likes: 210, submissions: 1 },
    { month: 'Apr 2024', views: 3600, likes: 290, submissions: 4 },
    { month: 'May 2024', views: 3100, likes: 235, submissions: 2 }
  ];

  const getImpactLevel = (score) => {
    if (score >= 90) return { level: 'Exceptional', color: '#667eea', icon: '🏆' };
    if (score >= 80) return { level: 'High Impact', color: '#48bb78', icon: '🌟' };
    if (score >= 70) return { level: 'Growing Influence', color: '#ed8936', icon: '🚀' };
    if (score >= 60) return { level: 'Emerging Artist', color: '#38b2ac', icon: '🌱' };
    return { level: 'Getting Started', color: '#a0aec0', icon: '🎯' };
  };

  const impactLevel = getImpactLevel(impactData.overview.socialScore);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const renderMetricContent = () => {
    switch (activeMetric) {
      case 'overview':
        return (
          <div className="metric-grid">
            <div className="metric-card highlight">
              <div className="metric-icon">🎨</div>
              <div className="metric-info">
                <h3>{impactData.overview.totalArtworks}</h3>
                <p>Total Artworks Created</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">👁️</div>
              <div className="metric-info">
                <h3>{formatNumber(impactData.overview.totalViews)}</h3>
                <p>Total Views</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">❤️</div>
              <div className="metric-info">
                <h3>{formatNumber(impactData.overview.totalLikes)}</h3>
                <p>Total Likes</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">💬</div>
              <div className="metric-info">
                <h3>{impactData.overview.totalComments}</h3>
                <p>Total Comments</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🏗️</div>
              <div className="metric-info">
                <h3>{impactData.overview.projectsParticipated}</h3>
                <p>Projects Participated</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🏘️</div>
              <div className="metric-info">
                <h3>{impactData.overview.communitiesReached}</h3>
                <p>Communities Reached</p>
              </div>
            </div>
          </div>
        );
        
      case 'engagement':
        return (
          <div className="engagement-details">
            <div className="engagement-stats">
              <div className="stat-row">
                <span className="stat-label">📊 Average Views per Artwork:</span>
                <span className="stat-value">{formatNumber(impactData.engagement.averageViews)}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">💖 Average Likes per Artwork:</span>
                <span className="stat-value">{impactData.engagement.averageLikes}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">💬 Average Comments per Artwork:</span>
                <span className="stat-value">{impactData.engagement.averageComments}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">📈 Engagement Rate:</span>
                <span className="stat-value">{impactData.engagement.engagementRate}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">🔄 Total Shares:</span>
                <span className="stat-value">{impactData.engagement.sharesTotalCount}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">💾 Saved by Users:</span>
                <span className="stat-value">{impactData.engagement.savedByUsers}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">👥 New Followers Gained:</span>
                <span className="stat-value">+{impactData.engagement.followersGained}</span>
              </div>
            </div>
          </div>
        );
        
      case 'community':
        return (
          <div className="community-impact">
            <div className="communities-reached">
              <h3>🏘️ Communities Impacted</h3>
              <div className="community-list">
                {impactData.community.communitiesImpacted.map((community, index) => (
                  <div key={index} className="community-item">
                    <div className="community-info">
                      <h4>{community.name}</h4>
                      <p>{community.artworks} artworks • {formatNumber(community.engagement)} total engagement</p>
                    </div>
                    <div className="community-bar">
                      <div 
                        className="community-progress"
                        style={{ width: `${(community.engagement / 5000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="community-activities">
              <div className="activity-grid">
                <div className="activity-item">
                  <span className="activity-icon">🤝</span>
                  <div>
                    <h4>{impactData.community.collaborations}</h4>
                    <p>Collaborations</p>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🎓</span>
                  <div>
                    <h4>{impactData.community.mentorshipHours}h</h4>
                    <p>Mentorship Given</p>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🎪</span>
                  <div>
                    <h4>{impactData.community.workshopsAttended}</h4>
                    <p>Workshops Attended</p>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🎉</span>
                  <div>
                    <h4>{impactData.community.communityEvents}</h4>
                    <p>Community Events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'recognition':
        return (
          <div className="recognition-details">
            <div className="recognition-grid">
              <div className="recognition-card">
                <div className="recognition-icon">⭐</div>
                <div className="recognition-info">
                  <h3>{impactData.recognition.featuredTimes}</h3>
                  <p>Times Featured</p>
                  <span className="recognition-desc">Showcased in community highlights</span>
                </div>
              </div>
              
              <div className="recognition-card">
                <div className="recognition-icon">🏆</div>
                <div className="recognition-info">
                  <h3>{impactData.recognition.awards}</h3>
                  <p>Awards Received</p>
                  <span className="recognition-desc">Community Choice Award 2023</span>
                </div>
              </div>
              
              <div className="recognition-card">
                <div className="recognition-icon">📺</div>
                <div className="recognition-info">
                  <h3>{impactData.recognition.mediaFeatures}</h3>
                  <p>Media Features</p>
                  <span className="recognition-desc">Local news and social media</span>
                </div>
              </div>
              
              <div className="recognition-card">
                <div className="recognition-icon">💬</div>
                <div className="recognition-info">
                  <h3>{impactData.recognition.testimonials}</h3>
                  <p>Community Testimonials</p>
                  <span className="recognition-desc">Positive feedback from viewers</span>
                </div>
              </div>
              
              <div className="recognition-card">
                <div className="recognition-icon">🔥</div>
                <div className="recognition-info">
                  <h3>{impactData.recognition.influencerShares}</h3>
                  <p>Influencer Shares</p>
                  <span className="recognition-desc">Shared by local influencers</span>
                </div>
              </div>
              
              <div className="recognition-card">
                <div className="recognition-icon">🏛️</div>
                <div className="recognition-info">
                  <h3>{impactData.recognition.governmentRecognition}</h3>
                  <p>Government Recognition</p>
                  <span className="recognition-desc">Acknowledged by Transport NSW</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="my-impact-page">
      <div className="impact-container">
        <div className="impact-header">
          <div className="header-content">
            <h1>📊 My Social Impact Stats</h1>
            <p>Track your artistic influence and community engagement across Australia</p>
          </div>
          
          <div className="impact-level-card">
            <div className="impact-level-icon" style={{ color: impactLevel.color }}>
              {impactLevel.icon}
            </div>
            <div className="impact-level-info">
              <h3 style={{ color: impactLevel.color }}>{impactLevel.level}</h3>
              <div className="impact-score">
                <span>Impact Score: {impactData.overview.socialScore}/100</span>
                <div className="score-bar">
                  <div 
                    className="score-progress"
                    style={{ 
                      width: `${impactData.overview.socialScore}%`,
                      backgroundColor: impactLevel.color 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="impact-controls">
          <div className="metric-tabs">
            <button 
              className={activeMetric === 'overview' ? 'tab active' : 'tab'}
              onClick={() => setActiveMetric('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={activeMetric === 'engagement' ? 'tab active' : 'tab'}
              onClick={() => setActiveMetric('engagement')}
            >
              💖 Engagement
            </button>
            <button 
              className={activeMetric === 'community' ? 'tab active' : 'tab'}
              onClick={() => setActiveMetric('community')}
            >
              🏘️ Community
            </button>
            <button 
              className={activeMetric === 'recognition' ? 'tab active' : 'tab'}
              onClick={() => setActiveMetric('recognition')}
            >
              🏆 Recognition
            </button>
          </div>
          
          <div className="timeframe-selector">
            <label>Time Period:</label>
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="all">All Time</option>
              <option value="year">This Year</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>

        <div className="metrics-section">
          {renderMetricContent()}
        </div>

        <div className="recent-activity">
          <h2>🔥 Recent Impact Activity</h2>
          <div className="activity-timeline">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <h4>{activity.title}</h4>
                  <p className="activity-impact">{activity.impact}</p>
                  <span className="activity-date">
                    {new Date(activity.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="growth-chart">
          <h2>📈 Growth Over Time</h2>
          <div className="chart-container">
            <div className="chart-bars">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="chart-month">
                  <div className="bar-group">
                    <div 
                      className="bar views"
                      style={{ height: `${(stat.views / 4000) * 100}px` }}
                      title={`Views: ${stat.views}`}
                    ></div>
                    <div 
                      className="bar likes"
                      style={{ height: `${(stat.likes / 300) * 100}px` }}
                      title={`Likes: ${stat.likes}`}
                    ></div>
                    <div 
                      className="bar submissions"
                      style={{ height: `${(stat.submissions / 5) * 100}px` }}
                      title={`Submissions: ${stat.submissions}`}
                    ></div>
                  </div>
                  <span className="month-label">{stat.month.split(' ')[0]}</span>
                </div>
              ))}
            </div>
            
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color views"></div>
                <span>Views</span>
              </div>
              <div className="legend-item">
                <div className="legend-color likes"></div>
                <span>Likes</span>
              </div>
              <div className="legend-item">
                <div className="legend-color submissions"></div>
                <span>Submissions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyImpact;