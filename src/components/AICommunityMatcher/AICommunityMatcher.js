import React, { useState, useEffect } from 'react';
import './AICommunityMatcher.css';

const AICommunityMatcher = ({ user = { name: 'Sarah Chen', skills: ['Digital Art', 'Cultural Storytelling'] } }) => {
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [matchType, setMatchType] = useState('collaboration');

  // Mock artist database with diverse backgrounds
  const mockArtistDatabase = [
    {
      id: 1,
      name: 'Uncle Billy Warrawong',
      culturalBackground: 'Aboriginal Australian',
      location: 'Sydney, NSW',
      skills: ['Traditional Dot Painting', 'Dreamtime Stories', 'Cultural Education'],
      experience: 'Senior',
      projects: ['Western Sydney Metro', 'Harbour Bridge Installation'],
      interests: ['Mentorship', 'Cultural Bridge-Building', 'Youth Education'],
      availability: 'Part-time',
      matchScore: 96,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Traditional knowledge keeper with 30+ years experience sharing Aboriginal culture through contemporary art forms.',
      collaborationType: ['Mentor', 'Cultural Consultant'],
      recentWork: 'Led community mural project connecting 15 Aboriginal youth with their heritage'
    },
    {
      id: 2,
      name: 'Maria Santos-Rodriguez',
      culturalBackground: 'Latin American Australian',
      location: 'Melbourne, VIC',
      skills: ['Community Murals', 'Social Justice Art', 'Workshop Leadership'],
      experience: 'Mid-level',
      projects: ['Pacific Highway Upgrade', 'Community Center Revitalization'],
      interests: ['Community Empowerment', 'Multicultural Collaboration', 'Public Art'],
      availability: 'Full-time',
      matchScore: 94,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b2e0a9a5?w=150&h=150&fit=crop&crop=face',
      bio: 'Passionate about creating art that brings communities together and addresses social inequalities.',
      collaborationType: ['Equal Partner', 'Project Lead'],
      recentWork: 'Created inclusive mural celebrating 8 different cultural communities'
    },
    {
      id: 3,
      name: 'Anh Nguyen',
      culturalBackground: 'Vietnamese Australian',
      location: 'Brisbane, QLD',
      skills: ['Digital Integration', 'Interactive Art', 'Technology Innovation'],
      experience: 'Mid-level',
      projects: ['Light Rail Extension', 'Smart City Integration'],
      interests: ['Tech-Art Fusion', 'Cultural Preservation', 'Innovation'],
      availability: 'Full-time',
      matchScore: 92,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Bridging traditional Vietnamese art with cutting-edge technology to create immersive cultural experiences.',
      collaborationType: ['Tech Specialist', 'Equal Partner'],
      recentWork: 'Developed AR app showcasing Vietnamese cultural stories in public spaces'
    },
    {
      id: 4,
      name: 'Fatima Al-Zahra',
      culturalBackground: 'Middle Eastern Australian',
      location: 'Perth, WA',
      skills: ['Islamic Geometric Art', 'Calligraphy', 'Interfaith Projects'],
      experience: 'Senior',
      projects: ['Airport Link Expansion', 'Multicultural Festival Installations'],
      interests: ['Religious Harmony', 'Cultural Education', 'Interfaith Dialogue'],
      availability: 'Part-time',
      matchScore: 89,
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=150&h=150&fit=crop&crop=face',
      bio: 'Creating beautiful geometric art that showcases the mathematical beauty of Islamic culture while promoting understanding.',
      collaborationType: ['Cultural Advisor', 'Artistic Contributor'],
      recentWork: 'Designed prayer space artwork fostering interfaith community connections'
    },
    {
      id: 5,
      name: 'Jamie Thompson',
      culturalBackground: 'LGBTQIA+ Advocate',
      location: 'Adelaide, SA',
      skills: ['Pride Art', 'Community Organizing', 'Inclusive Design'],
      experience: 'Mid-level',
      projects: ['Rainbow Bridge Project', 'Pride Month Installations'],
      interests: ['LGBTQIA+ Representation', 'Inclusive Communities', 'Youth Support'],
      availability: 'Full-time',
      matchScore: 91,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Dedicated to creating art that celebrates diversity and provides safe spaces for LGBTQIA+ community members.',
      collaborationType: ['Community Organizer', 'Equal Partner'],
      recentWork: 'Organized inclusive art workshops reaching 200+ LGBTQIA+ youth'
    },
    {
      id: 6,
      name: 'Raj Patel',
      culturalBackground: 'Indian Australian',
      location: 'Darwin, NT',
      skills: ['Traditional Indian Art', 'Festival Organization', 'Cultural Fusion'],
      experience: 'Senior',
      projects: ['Northern Territory Cultural Trail', 'Diwali Public Celebrations'],
      interests: ['Cultural Festivals', 'Traditional Arts', 'Community Celebration'],
      availability: 'Part-time',
      matchScore: 87,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      bio: 'Master of traditional Indian art forms, specializing in bringing festival culture to Australian public spaces.',
      collaborationType: ['Cultural Specialist', 'Festival Coordinator'],
      recentWork: 'Created stunning Rangoli art installation for Darwin multicultural festival'
    }
  ];

  const interestOptions = [
    'Aboriginal Culture', 'Multicultural Collaboration', 'Youth Engagement',
    'LGBTQIA+ Inclusion', 'Environmental Art', 'Digital Innovation',
    'Community Healing', 'Cultural Bridge-Building', 'Traditional Arts',
    'Social Justice', 'Interfaith Dialogue', 'Mentorship'
  ];

  const handleFindMatches = () => {
    setIsMatching(true);
    setMatches([]);
    
    // Simulate AI matching process
    setTimeout(() => {
      let filteredMatches = mockArtistDatabase;
      
      // Filter by match type and interests
      if (selectedInterests.length > 0) {
        filteredMatches = filteredMatches.filter(artist => 
          selectedInterests.some(interest => 
            artist.interests.some(artistInterest => 
              artistInterest.toLowerCase().includes(interest.toLowerCase()) ||
              interest.toLowerCase().includes(artistInterest.toLowerCase())
            )
          )
        );
      }
      
      // Sort by match score and add some randomization
      filteredMatches = filteredMatches
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 4);
      
      setMatches(filteredMatches);
      setIsMatching(false);
    }, 2800);
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const getMatchScoreColor = (score) => {
    if (score >= 95) return '#10b981';
    if (score >= 90) return '#3b82f6';
    if (score >= 85) return '#f59e0b';
    return '#6b7280';
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'Full-time' ? '#10b981' : '#f59e0b';
  };

  return (
    <div className="ai-community-matcher">
      <div className="matcher-header">
        <h2>🤖 AI Community Matcher</h2>
        <p>Find perfect collaboration partners, mentors, and community connections powered by AI</p>
      </div>

      <div className="matching-preferences">
        <div className="preference-section">
          <h3>What type of connection are you looking for?</h3>
          <div className="match-type-selector">
            <label className={`match-type ${matchType === 'collaboration' ? 'active' : ''}`}>
              <input
                type="radio"
                name="matchType"
                value="collaboration"
                checked={matchType === 'collaboration'}
                onChange={(e) => setMatchType(e.target.value)}
              />
              <div className="match-type-content">
                <span className="match-type-icon">🤝</span>
                <div>
                  <strong>Equal Collaboration</strong>
                  <p>Partner with artists of similar experience levels</p>
                </div>
              </div>
            </label>
            <label className={`match-type ${matchType === 'mentorship' ? 'active' : ''}`}>
              <input
                type="radio"
                name="matchType"
                value="mentorship"
                checked={matchType === 'mentorship'}
                onChange={(e) => setMatchType(e.target.value)}
              />
              <div className="match-type-content">
                <span className="match-type-icon">👨‍🏫</span>
                <div>
                  <strong>Find a Mentor</strong>
                  <p>Connect with experienced artists for guidance</p>
                </div>
              </div>
            </label>
            <label className={`match-type ${matchType === 'community' ? 'active' : ''}`}>
              <input
                type="radio"
                name="matchType"
                value="community"
                checked={matchType === 'community'}
                onChange={(e) => setMatchType(e.target.value)}
              />
              <div className="match-type-content">
                <span className="match-type-icon">🌍</span>
                <div>
                  <strong>Community Building</strong>
                  <p>Join broader community initiatives and projects</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="interests-section">
          <h3>Select your interests (AI will find complementary matches):</h3>
          <div className="interests-grid">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                className={`interest-tag ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button 
          className="find-matches-btn"
          onClick={handleFindMatches}
          disabled={isMatching}
        >
          {isMatching ? '🧠 AI Analyzing Community...' : '🎯 Find My Perfect Matches'}
        </button>
      </div>

      {isMatching && (
        <div className="matching-process">
          <div className="ai-matching-animation">
            <div className="ai-brain-large">🤖</div>
            <div className="matching-steps">
              <div className="step active">Analyzing your artistic profile...</div>
              <div className="step active">Scanning community database...</div>
              <div className="step active">Calculating compatibility scores...</div>
              <div className="step">Generating personalized matches...</div>
            </div>
          </div>
          <p>AI is analyzing 500+ community artists to find your perfect collaborators...</p>
        </div>
      )}

      {matches.length > 0 && !isMatching && (
        <div className="match-results">
          <div className="results-header">
            <h3>🎉 Your AI-Generated Matches</h3>
            <p>Based on cultural compatibility, shared interests, and collaboration potential</p>
          </div>

          <div className="matches-grid">
            {matches.map((artist) => (
              <div key={artist.id} className="match-card">
                <div className="match-header">
                  <div className="artist-avatar">
                    <img src={artist.image} alt={artist.name} />
                    <div className="availability-indicator" style={{ backgroundColor: getAvailabilityColor(artist.availability) }}>
                      {artist.availability}
                    </div>
                  </div>
                  <div className="artist-info">
                    <h4>{artist.name}</h4>
                    <p className="cultural-background">{artist.culturalBackground}</p>
                    <p className="location">📍 {artist.location}</p>
                  </div>
                  <div className="match-score">
                    <div 
                      className="score-circle"
                      style={{ borderColor: getMatchScoreColor(artist.matchScore) }}
                    >
                      <span style={{ color: getMatchScoreColor(artist.matchScore) }}>
                        {artist.matchScore}%
                      </span>
                    </div>
                    <span className="score-label">Match</span>
                  </div>
                </div>

                <div className="artist-bio">
                  <p>{artist.bio}</p>
                </div>

                <div className="artist-details">
                  <div className="detail-section">
                    <strong>Skills:</strong>
                    <div className="skills-list">
                      {artist.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <strong>Collaboration Types:</strong>
                    <div className="collab-types">
                      {artist.collaborationType.map((type, index) => (
                        <span key={index} className="collab-tag">{type}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <strong>Shared Interests:</strong>
                    <div className="shared-interests">
                      {artist.interests.filter(interest => 
                        selectedInterests.some(selected => 
                          selected.toLowerCase().includes(interest.toLowerCase()) ||
                          interest.toLowerCase().includes(selected.toLowerCase())
                        )
                      ).map((interest, index) => (
                        <span key={index} className="shared-interest">{interest}</span>
                      ))}
                    </div>
                  </div>

                  <div className="recent-work">
                    <strong>Recent Impact:</strong>
                    <p>{artist.recentWork}</p>
                  </div>
                </div>

                <div className="match-actions">
                  <button className="btn btn-primary">
                    💬 Start Conversation
                  </button>
                  <button className="btn btn-secondary">
                    👥 View Full Profile
                  </button>
                  <button className="btn btn-secondary">
                    🎯 Suggest Project
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="matching-insights">
            <h4>🧠 AI Matching Insights</h4>
            <div className="insights-grid">
              <div className="insight-card">
                <span className="insight-icon">🌈</span>
                <div>
                  <strong>Cultural Diversity Score:</strong>
                  <p>Your matches span 6 different cultural backgrounds, creating rich collaboration opportunities.</p>
                </div>
              </div>
              <div className="insight-card">
                <span className="insight-icon">🎯</span>
                <div>
                  <strong>Skill Complementarity:</strong>
                  <p>AI detected perfect skill gaps that your matches can fill for stronger project outcomes.</p>
                </div>
              </div>
              <div className="insight-card">
                <span className="insight-icon">📍</span>
                <div>
                  <strong>Geographic Reach:</strong>
                  <p>Matches include both local collaborators and interstate opportunities for broader impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICommunityMatcher;