import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import absDataService from '../../services/absDataService';
import socialCohesionService from '../../services/socialCohesionService';
import learningTrainingService from '../../services/learningTrainingService';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [absStats, setAbsStats] = useState(null);
  const [socialCohesionStats, setSocialCohesionStats] = useState(null);
  const [learningStats, setLearningStats] = useState(null);

  useEffect(() => {
    const stats = absDataService.getDashboardStats();
    const socialStats = socialCohesionService.getSocialCohesionDashboard();
    const learningData = learningTrainingService.getLearningDashboardStats();
    setAbsStats(stats);
    setSocialCohesionStats(socialStats);
    setLearningStats(learningData);
  }, []);

  const mockProjects = [
    {
      id: 1,
      title: 'Western Sydney Metro',
      location: 'Parramatta to Sydney CBD',
      status: 'Active',
      phase: 'Art Collection',
      artworks: 12,
      deadline: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Pacific Highway Upgrade',
      location: 'Northern Beaches',
      status: 'Planning',
      phase: 'Community Engagement',
      artworks: 0,
      deadline: '2024-04-20',
      image: 'https://plus.unsplash.com/premium_photo-1703385178754-f16e0a332e4a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbiUyMHBhaW50aW5nc3xlbnwwfHwwfHx8MA%3D%3D?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Light Rail Extension',
      location: 'Inner West',
      status: 'Active',
      phase: 'Installation',
      artworks: 8,
      deadline: '2024-02-28',
      image: 'https://images.unsplash.com/photo-1714249158936-8e07d15c6397?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluZGlhbiUyMHBhaW50aW5nc3xlbnwwfHwwfHx8MA%3D%3D?w=300&h=200&fit=crop&crop=center'
    }
  ];

  const mockStats = {
    totalProjects: 15,
    activeProjects: 8,
    totalSubmissions: 47,
    approvedArtworks: 32,
    communityReach: 12500,
    artistsInvolved: 89
  };

  const recentSubmissions = [
    {
      id: 1,
      title: 'Rainbow Connections',
      artist: 'Alex Chen-Patel',
      project: 'Western Sydney Metro',
      status: 'Under Review',
      submittedAt: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Faith in Unity',
      artist: 'Rabbi Sarah Al-Rashid',
      project: 'Pacific Highway Upgrade',
      status: 'Approved',
      submittedAt: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1612373931332-9fbb9b2290a1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhbiUyMHBhaW50aW5nc3xlbnwwfHwwfHx8MA%3D%3D?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Ancestral Wisdom',
      artist: 'Uncle Billy Yamurru-Wilson',
      project: 'Light Rail Extension',
      status: 'Approved',
      submittedAt: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=80&h=80&fit=crop&crop=center'
    }
  ];

  const renderOverview = () => (
    <div className="overview-content">
      <div className="artaura-branding">
        <div className="app-logo">
          <div className="logo-text-container">
            <div className="logo-text-content">
              <h1 className="app-name">🎨Artaura</h1>
              <p className="app-tagline">Art Beyond Barriers</p>
            </div>
          </div>
        </div>
        <div className="brand-description">
          <p>Transforming construction sites into community art spaces across Australia</p>
        </div>
      </div>
      
      <div className="welcome-section">
        <div className="welcome-text">
          <h2>Welcome back, {user?.name || user?.username}! 👋</h2>
          <p>Ready to create meaningful connections through public art and community engagement.</p>
        </div>
        <div className="quick-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/submit-artwork')}
          >
            🎨 Submit New Artwork
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/social-impact')}
          >
            🤝 View Social Impact
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/ai-art-analyzer')}
          >
            🤖 Try AI Art Analyzer
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏗️</div>
          <div className="stat-info">
            <h3>{mockStats.totalProjects}</h3>
            <p>Infrastructure Projects</p>
            <small>Transforming barriers into bridges</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{absStats ? `${absStats.youthEngagementRate}%` : '81%'}</h3>
            <p>Youth Engagement Rate</p>
            <small>Ages 15-24 fully engaged (ABS 2024)</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-info">
            <h3>{absStats ? `${absStats.employmentSuccessRate}%` : '84%'}</h3>
            <p>Graduate Employment</p>
            <small>2023 graduates employed in 2024</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{learningStats ? `${learningStats.totalLearningParticipation}%` : '42%'}</h3>
            <p>Learning Participation</p>
            <small>Australians engaged in learning (2020-21)</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-info">
            <h3>{learningStats ? `${learningStats.workRelatedTraining}%` : '23%'}</h3>
            <p>Work-Related Training</p>
            <small>Skills development for employment</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <div className="stat-info">
            <h3>+{learningStats ? `${learningStats.onlineLearningGrowth}%` : '36%'}</h3>
            <p>Online Learning Growth</p>
            <small>Increase since 2016-17</small>
          </div>
        </div>
      </div>

      {/* Learning & Training Impact Section */}
      {learningStats && (
        <div className="learning-impact-section">
          <div className="section-branding">
            <h2>📚 Artaura's Learning & Skills Development Impact</h2>
            <div className="section-subtitle">
              <span className="brand-highlight">Art Beyond Barriers</span> × <span className="data-source">ABS Work-Related Training 2020-21</span>
            </div>
          </div>
          <p className="section-description">
            How <strong>Artaura</strong> leverages Australia's learning landscape to build skills, create opportunities, and bridge employment gaps through community art programs.
          </p>
          
          <div className="learning-stats-grid">
            <div className="learning-card primary">
              <div className="learning-icon">🎯</div>
              <div className="learning-content">
                <h3>{learningStats.totalLearningParticipation}%</h3>
                <p>Participate in learning annually</p>
                <small>7.8 million Australians engaged in education</small>
              </div>
            </div>
            
            <div className="learning-card secondary">
              <div className="learning-icon">👩‍💼</div>
              <div className="learning-content">
                <h3>+{learningStats.femaleAdvantageInTraining}%</h3>
                <p>Higher female participation in work training</p>
                <small>Employed women: 35% vs employed men: 30%</small>
              </div>
            </div>
            
            <div className="learning-card tertiary">
              <div className="learning-icon">💡</div>
              <div className="learning-content">
                <h3>{learningStats.skillDevelopmentMotivation}%</h3>
                <p>Train to increase job skills</p>
                <small>Primary motivation for work-related learning</small>
              </div>
            </div>
            
            <div className="learning-card quaternary">
              <div className="learning-icon">🌐</div>
              <div className="learning-content">
                <h3>{learningStats.onlineLearningGrowth + 19}%</h3>
                <p>Choose online learning delivery</p>
                <small>Dramatic increase from 19% to 55% post-COVID</small>
              </div>
            </div>
            
            <div className="learning-card success">
              <div className="learning-icon">🎨</div>
              <div className="learning-content">
                <h3>{learningStats.personalInterestLearning}%</h3>
                <p>Learn for personal interest</p>
                <small>Art & creativity as skill development</small>
              </div>
            </div>
            
            <div className="learning-card warning">
              <div className="learning-icon">⚠️</div>
              <div className="learning-content">
                <h3>5%</h3>
                <p>Want to study but face barriers</p>
                <small>924,000 Australians need support to access learning</small>
              </div>
            </div>
          </div>
          
          <div className="learning-opportunities">
            <h3>🎯 How Artaura's "Art Beyond Barriers" Approach Addresses Learning Gaps</h3>
            <div className="opportunities-grid">
              <div className="opportunity-point">
                <span className="opportunity-emoji">⏰</span>
                <h4>Time Flexibility</h4>
                <p>Address the 34-40% who cite "too much work/no time" as a barrier through flexible, modular art workshops that fit around work schedules.</p>
              </div>
              <div className="opportunity-point">
                <span className="opportunity-emoji">💰</span>
                <h4>Financial Accessibility</h4>
                <p>Tackle financial barriers (31-35%) by partnering with employers for sponsored art training and offering free community workshops.</p>
              </div>
              <div className="opportunity-point">
                <span className="opportunity-emoji">🔧</span>
                <h4>Skills Integration</h4>
                <p>Combine art learning with work-related training, appealing to the 91% who want to increase job skills while creating beautiful public spaces.</p>
              </div>
              <div className="opportunity-point">
                <span className="opportunity-emoji">👥</span>
                <h4>Community Focus</h4>
                <p>Support the 5% facing study barriers and 6% interested in personal learning through accessible, community-based art education programs.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {socialCohesionStats && (
        <div className="social-cohesion-section">
          <div className="section-branding">
            <h2>🤝 Artaura's Social Inclusion Impact</h2>
            <div className="section-subtitle">
              <span className="brand-highlight">Art Beyond Barriers</span> × <span className="data-source">Scanlon Institute 2024</span>
            </div>
          </div>
          <p className="section-description">
            How <strong>Artaura</strong> contributes to Australia's social cohesion and multicultural harmony through transformative public art initiatives.
          </p>
          
          <div className="cohesion-stats-grid">
            <div className="cohesion-card primary">
              <div className="cohesion-icon">🌏</div>
              <div className="cohesion-content">
                <h3>{socialCohesionStats.multiculturalEngagement}%</h3>
                <p>See multiculturalism as good for Australia</p>
                <small>Art bridges cultural divides</small>
              </div>
            </div>
            
            <div className="cohesion-card secondary">
              <div className="cohesion-icon">🏘️</div>
              <div className="cohesion-content">
                <h3>{socialCohesionStats.communityConnection}%</h3>
                <p>Feel sense of local belonging</p>
                <small>+{socialCohesionStats.belongingImprovement}% improvement potential</small>
              </div>
            </div>
            
            <div className="cohesion-card tertiary">
              <div className="cohesion-icon">👥</div>
              <div className="cohesion-content">
                <h3>{socialCohesionStats.crossCulturalFriendships}%</h3>
                <p>Have close friends from different backgrounds</p>
                <small>Fostered through collaborative art</small>
              </div>
            </div>
            
            <div className="cohesion-card quaternary">
              <div className="cohesion-icon">⚡</div>
              <div className="cohesion-content">
                <h3>{socialCohesionStats.youthActivismChanneling}%</h3>
                <p>Young adults engage in activism</p>
                <small>Channeled into constructive creativity</small>
              </div>
            </div>
            
            <div className="cohesion-card success">
              <div className="cohesion-icon">🤲</div>
              <div className="cohesion-content">
                <h3>{socialCohesionStats.communityHelpingBehavior}%</h3>
                <p>Say people in their area help each other</p>
                <small>Strengthened through shared projects</small>
              </div>
            </div>
            
            <div className="cohesion-card warning">
              <div className="cohesion-icon">💼</div>
              <div className="cohesion-content">
                <h3>{socialCohesionStats.economicEmpowermentPotential}%</h3>
                <p>Are struggling economically</p>
                <small>Addressed through skills & employment</small>
              </div>
            </div>
          </div>
          
          <div className="impact-explanation">
            <h3>How Artaura's "Art Beyond Barriers" Philosophy Builds Social Cohesion</h3>
            <div className="impact-points-grid">
              <div className="impact-point">
                <span className="impact-emoji">🎨</span>
                <h4>Cultural Bridge-Building</h4>
                <p>Creates shared creative experiences that bring together people from different backgrounds, addressing the concerns of the 49% who worry about immigration levels.</p>
              </div>
              <div className="impact-point">
                <span className="impact-emoji">💪</span>
                <h4>Economic Empowerment</h4>
                <p>Provides skills development and employment pathways for the 41% who describe themselves as "poor" or "just getting along".</p>
              </div>
              <div className="impact-point">
                <span className="impact-emoji">🕊️</span>
                <h4>Interfaith Harmony</h4>
                <p>Reduces negative attitudes toward different religious groups through collaborative art projects that celebrate diversity.</p>
              </div>
              <div className="impact-point">
                <span className="impact-emoji">🌟</span>
                <h4>Youth Engagement</h4>
                <p>Channels the activist energy of 42% of young adults (18-34) into constructive community building through art.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Features Section */}
      <div className="ai-features-section">
        <div className="section-branding">
          <h2>🤖 AI-Powered Community Building</h2>
          <div className="section-subtitle">
            <span className="brand-highlight">Art Beyond Barriers</span> × <span className="data-source">Advanced AI Technology</span>
          </div>
        </div>
        <p className="section-description">
          <strong>Artaura</strong> leverages cutting-edge AI to enhance cultural understanding, foster community connections, and maximize the social impact of every artwork.
        </p>
        
        <div className="ai-features-grid">
          <div className="ai-feature-card primary" onClick={() => navigate('/ai-art-analyzer')}>
            <div className="ai-feature-header">
              <div className="ai-feature-icon">🎨🤖</div>
              <h3>AI Art Style Analyzer</h3>
            </div>
            <div className="ai-feature-content">
              <p>Analyze artwork with advanced computer vision to identify cultural influences, artistic techniques, and social impact potential.</p>
              <ul className="ai-feature-capabilities">
                <li>✨ Cultural pattern recognition</li>
                <li>🎯 Social impact prediction</li>
                <li>🛡️ Cultural sensitivity assessment</li>
                <li>👥 Similar artist recommendations</li>
              </ul>
              <div className="ai-feature-stats">
                <div className="ai-stat">
                  <span className="ai-stat-number">94%</span>
                  <span className="ai-stat-label">Accuracy Rate</span>
                </div>
                <div className="ai-stat">
                  <span className="ai-stat-number">15+</span>
                  <span className="ai-stat-label">Art Styles Recognized</span>
                </div>
                <div className="ai-stat">
                  <span className="ai-stat-number">98%</span>
                  <span className="ai-stat-label">Cultural Sensitivity Score</span>
                </div>
              </div>
            </div>
            <div className="ai-feature-action">
              <span className="try-now-btn">🚀 Analyze Your Art →</span>
            </div>
          </div>

          <div className="ai-feature-card secondary" onClick={() => navigate('/ai-community-matcher')}>
            <div className="ai-feature-header">
              <div className="ai-feature-icon">🧠🤝</div>
              <h3>AI Community Matcher</h3>
            </div>
            <div className="ai-feature-content">
              <p>Find perfect collaboration partners, mentors, and community connections using intelligent matching algorithms.</p>
              <ul className="ai-feature-capabilities">
                <li>🌈 Cultural compatibility matching</li>
                <li>🔧 Skill complementarity analysis</li>
                <li>📍 Geographic optimization</li>
                <li>🎯 Project opportunity suggestions</li>
              </ul>
              <div className="ai-feature-stats">
                <div className="ai-stat">
                  <span className="ai-stat-number">500+</span>
                  <span className="ai-stat-label">Artists in Database</span>
                </div>
                <div className="ai-stat">
                  <span className="ai-stat-number">92%</span>
                  <span className="ai-stat-label">Match Success Rate</span>
                </div>
                <div className="ai-stat">
                  <span className="ai-stat-number">6</span>
                  <span className="ai-stat-label">Cultural Backgrounds</span>
                </div>
              </div>
            </div>
            <div className="ai-feature-action">
              <span className="try-now-btn">🚀 Find Your Matches →</span>
            </div>
          </div>
        </div>

        <div className="ai-impact-metrics">
          <h3>🧠 AI-Driven Community Impact</h3>
          <div className="ai-impact-grid">
            <div className="ai-impact-card">
              <div className="ai-impact-icon">🌍</div>
              <div className="ai-impact-content">
                <h4>Cultural Bridge-Building</h4>
                <div className="ai-impact-stat">87% average community engagement score</div>
                <p>AI identifies optimal cultural combinations for maximum social cohesion impact</p>
              </div>
            </div>
            <div className="ai-impact-card">
              <div className="ai-impact-icon">🎯</div>
              <div className="ai-impact-content">
                <h4>Precision Matching</h4>
                <div className="ai-impact-stat">94% successful collaborations</div>
                <p>Advanced algorithms ensure compatible partnerships across cultural and skill divides</p>
              </div>
            </div>
            <div className="ai-impact-card">
              <div className="ai-impact-icon">📚</div>
              <div className="ai-impact-content">
                <h4>Educational Value</h4>
                <div className="ai-impact-stat">89% learning engagement rate</div>
                <p>AI-curated cultural insights enhance community understanding and appreciation</p>
              </div>
            </div>
            <div className="ai-impact-card">
              <div className="ai-impact-icon">🚀</div>
              <div className="ai-impact-content">
                <h4>Innovation Acceleration</h4>
                <div className="ai-impact-stat">3.5x faster project completion</div>
                <p>Smart recommendations streamline collaboration and reduce planning time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-testimonials">
          <h3>💬 What Artists Say About Our AI Features</h3>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">"The AI Art Analyzer helped me understand the cultural significance of my work in ways I never considered. It's like having a cultural advisor and art historian in one tool."</div>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>Maria Santos-Rodriguez</strong>
                  <span>Latin American Community Artist</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">"I found three perfect collaboration partners through the AI Community Matcher. The cultural compatibility insights were spot-on and led to our most successful project yet."</div>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>Uncle Billy Warrawong</strong>
                  <span>Aboriginal Traditional Artist</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">"As a tech artist, the AI tools help me bridge traditional techniques with digital innovation. The recommendations opened doors to collaborations I never imagined."</div>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>Anh Nguyen</strong>
                  <span>Vietnamese-Australian Digital Artist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section active-projects">
          <div className="section-header">
            <h2>Active Projects</h2>
            <button className="view-all-btn" onClick={() => navigate('/projects')}>View All</button>
          </div>
          <div className="projects-grid">
            {mockProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-status">
                    <span className={`status-badge ${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p className="project-location">📍 {project.location}</p>
                  <p className="project-phase">🎯 Phase: {project.phase}</p>
                  <div className="project-meta">
                    <span className="artwork-count">{project.artworks} artworks</span>
                    <span className="deadline">Due: {project.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section recent-activity">
          <div className="section-header">
            <h2>Recent Submissions</h2>
            <button className="view-all-btn" onClick={() => navigate('/gallery')}>View All</button>
          </div>
          <div className="submissions-list">
            {recentSubmissions.map(submission => (
              <div key={submission.id} className="submission-item">
                <div className="submission-image">
                  <img src={submission.image} alt={submission.title} />
                </div>
                <div className="submission-info">
                  <h4>{submission.title}</h4>
                  <p>by {submission.artist}</p>
                  <p className="submission-project">{submission.project}</p>
                </div>
                <div className="submission-status">
                  <span className={`status-badge ${submission.status.toLowerCase().replace(' ', '-')}`}>
                    {submission.status}
                  </span>
                  <span className="submission-date">{submission.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navigation />
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-content">
            {renderOverview()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;