import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import absDataService from '../../services/absDataService';
import socialCohesionService from '../../services/socialCohesionService';
import './Projects.css';

const Projects = ({ user }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [enhancedProjects, setEnhancedProjects] = useState([]);

  const mockProjects = [
    {
      id: 1,
      title: 'Western Sydney Metro',
      location: 'Parramatta to Sydney CBD',
      status: 'Active',
      phase: 'Art Collection',
      artworks: 12,
      deadline: '2024-03-15',
      description: 'A major infrastructure project connecting Western Sydney to the CBD, providing opportunities for large-scale community art installations that celebrate the diverse cultures of the region.',
      budget: '$2.5M',
      coordinator: 'Sarah Williams',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop&crop=center',
      tags: ['Transport', 'Community', 'Large Scale'],
      progress: 75,
    },
    {
      id: 2,
      title: 'Pacific Highway Upgrade',
      location: 'Northern Beaches',
      status: 'Planning',
      phase: 'Community Engagement',
      artworks: 0,
      deadline: '2024-04-20',
      description: 'Highway improvement project focusing on environmental sustainability and coastal heritage representation through artistic installations.',
      budget: '$1.8M',
      coordinator: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1581850518616-bcb8077a2336?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JhZmZpdGklMjBhcnR8ZW58MHx8MHx8fDA%3D?w=400&h=300&fit=crop&crop=center',
      tags: ['Environment', 'Heritage', 'Coastal'],
      progress: 25
    },
    {
      id: 3,
      title: 'Light Rail Extension',
      location: 'Inner West',
      status: 'Active',
      phase: 'Installation',
      artworks: 8,
      deadline: '2024-02-28',
      description: 'Extending light rail services with a focus on showcasing local artists and representing the rich cultural tapestry of the Inner West.',
      budget: '$3.2M',
      coordinator: 'Emma Torres',
      image: 'https://images.unsplash.com/photo-1574117323765-150fe3d629ec?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1lJTIwZ3JhZmZpdGklMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D?w=400&h=300&fit=crop&crop=center',
      tags: ['Transport', 'Local Artists', 'Cultural'],
      progress: 60
    },
    {
      id: 4,
      title: 'Harbour Bridge Maintenance',
      location: 'Sydney Harbour',
      status: 'Completed',
      phase: 'Showcase',
      artworks: 15,
      deadline: '2023-12-15',
      description: 'A prestigious project featuring Indigenous art and maritime themes celebrating Sydney\'s iconic harbour and its cultural significance.',
      budget: '$4.1M',
      coordinator: 'David Kim',
      image: 'https://images.unsplash.com/photo-1617374995350-c26b53c74903?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFib3JpZ2luYWx8ZW58MHx8MHx8fDA%3D?w=400&h=300&fit=crop&crop=center',
      tags: ['Heritage', 'Indigenous', 'Iconic'],
      progress: 100
    },
    {
      id: 5,
      title: 'Airport Link Expansion',
      location: 'Mascot to CBD',
      status: 'Active',
      phase: 'Art Collection',
      artworks: 6,
      deadline: '2024-05-10',
      description: 'International gateway project showcasing multicultural themes and welcoming visitors with diverse artistic expressions.',
      budget: '$2.9M',
      coordinator: 'Lisa Anderson',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300&h=200&fit=crop&crop=center',
      tags: ['International', 'Multicultural', 'Gateway'],
      progress: 45
    }
  ];

  useEffect(() => {
    // Enhance projects with both ABS data insights and social cohesion impact
    const enhanced = mockProjects.map(project => {
      const absEnhanced = absDataService.enhanceProjectData(project);
      const socialImpact = socialCohesionService.getProjectSocialImpact(project);
      return {
        ...absEnhanced,
        socialCohesionImpact: socialImpact
      };
    });
    setEnhancedProjects(enhanced);
  }, []);

  const projectsToDisplay = enhancedProjects.length > 0 ? enhancedProjects : mockProjects;

  const filteredProjects = filterStatus === 'all' 
    ? projectsToDisplay 
    : projectsToDisplay.filter(project => project.status.toLowerCase() === filterStatus);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return '#10b981';
      case 'planning': return '#f59e0b';
      case 'completed': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Navigation />
      <div className="projects">
        <div className="projects-container">
        <div className="projects-header">
          <h1>Artaura Infrastructure Projects</h1>
          <p>Art Beyond Barriers - Transforming construction sites into community art spaces across Sydney</p>
        </div>

        <div className="projects-controls">
          <div className="filter-section">
            <label htmlFor="statusFilter">Filter by Status:</label>
            <select 
              id="statusFilter"
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Projects</option>
              <option value="active">Active</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="projects-count">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card" onClick={() => openProjectDetails(project)}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-status-overlay">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.progress}%</span>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-location">📍 {project.location}</p>
                <p className="project-phase">🎯 {project.phase}</p>
                
                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-number">{project.artworks}</span>
                    <span className="stat-label">Artworks</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{project.budget}</span>
                    <span className="stat-label">Budget</span>
                  </div>
                </div>
                
                <div className="project-tags">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="project-tag">+{project.tags.length - 2}</span>
                  )}
                </div>
                
                <div className="project-deadline">
                  Deadline: {project.deadline}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="project-modal-overlay" onClick={closeProjectDetails}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeProjectDetails}>×</button>
              
              <div className="modal-header">
                <img src={selectedProject.image} alt={selectedProject.title} />
                <div className="modal-header-info">
                  <h2>{selectedProject.title}</h2>
                  <p className="modal-location">📍 {selectedProject.location}</p>
                  <span 
                    className="status-badge large" 
                    style={{ backgroundColor: getStatusColor(selectedProject.status) }}
                  >
                    {selectedProject.status}
                  </span>
                </div>
              </div>
              
              <div className="modal-content">
                <div className="modal-section">
                  <h3>Project Description</h3>
                  <p>{selectedProject.description}</p>
                </div>
                
                <div className="modal-stats-grid">
                  <div className="modal-stat">
                    <span className="stat-label">Phase</span>
                    <span className="stat-value">{selectedProject.phase}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Artworks</span>
                    <span className="stat-value">{selectedProject.artworks}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Budget</span>
                    <span className="stat-value">{selectedProject.budget}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Coordinator</span>
                    <span className="stat-value">{selectedProject.coordinator}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Deadline</span>
                    <span className="stat-value">{selectedProject.deadline}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Progress</span>
                    <span className="stat-value">{selectedProject.progress}%</span>
                  </div>
                </div>
                
                <div className="modal-section">
                  <h3>Project Tags</h3>
                  <div className="project-tags">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {selectedProject.absInsights && (
                  <div className="modal-section">
                    <h3>Community Impact Insights <small>(Based on ABS 2024 Data)</small></h3>
                    <div className="insight-grid">
                      <div className="insight-card">
                        <h4>Youth Engagement</h4>
                        <p><strong>{selectedProject.absInsights.youthEngagementPotential.engagementRate}%</strong> engagement rate</p>
                        <p>{selectedProject.absInsights.youthEngagementPotential.potentialParticipants} potential participants</p>
                      </div>
                      <div className="insight-card">
                        <h4>Employment Outcomes</h4>
                        <p><strong>{selectedProject.absInsights.employmentOutcomes.projectedEmployment}</strong> projected jobs</p>
                        <p>{selectedProject.absInsights.employmentOutcomes.communityBenefit} community members engaged</p>
                      </div>
                      <div className="insight-card">
                        <h4>Apprentice Integration</h4>
                        <p><strong>{selectedProject.absInsights.apprenticeOpportunities.estimatedOpportunities}</strong> opportunities</p>
                        <p>{selectedProject.absInsights.apprenticeOpportunities.diversityPotential}% diversity potential</p>
                      </div>
                      <div className="insight-card">
                        <h4>Education Partnerships</h4>
                        <p><strong>{selectedProject.absInsights.educationPartnershipPotential.estimatedPartnerships}</strong> potential partners</p>
                        <p>{selectedProject.absInsights.educationPartnershipPotential.currentStudentPool}% student reach</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProject.learningOpportunities && (
                  <div className="modal-section">
                    <h3>📚 Learning & Skills Development Opportunities <small>(ABS Work-Related Training 2020-21)</small></h3>
                    <div className="learning-opportunities-grid">
                      <div className="learning-opportunity-card work">
                        <h4>💼 Work-Related Art Training</h4>
                        <p><strong>{selectedProject.learningOpportunities.workRelatedArtTraining.potentialParticipants}</strong> potential participants</p>
                        <small>{selectedProject.learningOpportunities.workRelatedArtTraining.onlineDeliveryPreference}% prefer online delivery</small>
                      </div>
                      <div className="learning-opportunity-card personal">
                        <h4>🎨 Personal Interest Art</h4>
                        <p><strong>{selectedProject.learningOpportunities.personalInterestArt.potentialParticipants}</strong> community learners</p>
                        <small>{selectedProject.learningOpportunities.personalInterestArt.enjoymentMotivation}% motivated by enjoyment</small>
                      </div>
                      <div className="learning-opportunity-card skills">
                        <h4>🎓 Skills Development</h4>
                        <p><strong>{selectedProject.learningOpportunities.personalInterestArt.skillGainMotivation}%</strong> want new skills</p>
                        <small>Art as pathway to employment</small>
                      </div>
                      <div className="learning-opportunity-card online">
                        <h4>💻 Online Learning Ready</h4>
                        <p><strong>{selectedProject.learningOpportunities.workRelatedArtTraining.onlineDeliveryPreference}%</strong> online capacity</p>
                        <small>Flexible art education delivery</small>
                      </div>
                    </div>
                    <div className="learning-barriers-mitigation">
                      <h4>🎯 Barrier Mitigation Strategies:</h4>
                      <ul>
                        <li><strong>Time Flexibility:</strong> Address work/time constraints through modular art workshops</li>
                        <li><strong>Financial Support:</strong> Partner with employers for sponsored training programs</li>
                        <li><strong>Accessibility Focus:</strong> Targeted outreach in disadvantaged communities</li>
                        <li><strong>Female Engagement:</strong> Leverage {selectedProject.learningOpportunities.workRelatedArtTraining.femaleEngagement}% female participation in work training</li>
                      </ul>
                    </div>
                  </div>
                )}

                {selectedProject.socialCohesionImpact && (
                  <div className="modal-section">
                    <h3>🤝 Social Cohesion Impact <small>(Based on Scanlon Institute 2024)</small></h3>
                    <div className="social-impact-grid">
                      <div className="social-impact-card multicultural">
                        <h4>🌏 Multicultural Reach</h4>
                        <p><strong>{selectedProject.socialCohesionImpact.multiculturalReach}%</strong></p>
                        <small>Enjoy meeting different cultures</small>
                      </div>
                      <div className="social-impact-card belonging">
                        <h4>🏘️ Community Belonging</h4>
                        <p><strong>+{selectedProject.socialCohesionImpact.communityBelongingBoost}%</strong></p>
                        <small>Improvement potential</small>
                      </div>
                      <div className="social-impact-card youth">
                        <h4>⚡ Youth Engagement</h4>
                        <p><strong>{selectedProject.socialCohesionImpact.youthEngagementPotential}%</strong></p>
                        <small>Young adults seeking activism</small>
                      </div>
                      <div className="social-impact-card economic">
                        <h4>💼 Economic Impact</h4>
                        <p><strong>{selectedProject.socialCohesionImpact.economicSkillsImpact}%</strong></p>
                        <small>Struggling economically</small>
                      </div>
                      <div className="social-impact-card interfaith">
                        <h4>🕊️ Interfaith Harmony</h4>
                        <p><strong>{selectedProject.socialCohesionImpact.interfaithHarmonyContribution}%</strong></p>
                        <small>Negative attitudes addressed</small>
                      </div>
                      <div className="social-impact-card safety">
                        <h4>🛡️ Community Safety</h4>
                        <p><strong>{selectedProject.socialCohesionImpact.safetyAndWellbeingImprovement}%</strong></p>
                        <small>Crime worry improvement</small>
                      </div>
                    </div>
                    <div className="social-impact-explanation">
                      <p>
                        <strong>This project directly addresses social cohesion challenges:</strong> It brings together people from diverse backgrounds (addressing the 49% concerned about immigration), 
                        channels youth activism constructively ({selectedProject.socialCohesionImpact.youthEngagementPotential}% of young adults engage in activism), 
                        and strengthens community connections while providing economic opportunities for the {selectedProject.socialCohesionImpact.economicSkillsImpact}% struggling financially.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="modal-actions">
                  <button className="btn btn-primary">
                    Submit Artwork for This Project
                  </button>
                  <button className="btn btn-secondary">
                    View Project Gallery
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

export default Projects;