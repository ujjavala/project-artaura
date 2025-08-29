import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import absDataService from '../../services/absDataService';
import socialCohesionService from '../../services/socialCohesionService';
import './SocialImpact.css';

const SocialImpact = ({ user }) => {
  const [absData, setAbsData] = useState(null);
  const [socialData, setSocialData] = useState(null);
  const [challenges, setChallenges] = useState(null);
  const [userImpact, setUserImpact] = useState(null);

  useEffect(() => {
    const abs = absDataService.getStaticABSData();
    const social = socialCohesionService.getScanlon2024Data();
    const challengesData = socialCohesionService.getChallengesAddressed();
    
    setAbsData(abs);
    setSocialData(social);
    setChallenges(challengesData);

    // Calculate personalized impact if user data is available
    if (user) {
      const impact = socialCohesionService.calculateUserSocialImpact({
        ageGroup: user.ageGroup || '25-34',
        educationLevel: user.educationLevel || 'bachelor',
        employmentStatus: user.employmentStatus || 'employed-ft',
        currentlyStudying: user.currentlyStudying || false
      });
      setUserImpact(impact);
    }
  }, [user]);

  if (!absData || !socialData || !challenges) {
    return (
      <>
        <Navigation />
        <div className="social-impact loading">
          <p>Loading social impact data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="social-impact">
        <div className="social-impact-container">
          
          {/* Hero Section */}
          <div className="impact-hero">
            <h1>🤝 Building Social Cohesion Through Art</h1>
            <p className="hero-subtitle">
              How Artaura addresses Australia's key social challenges using evidence-based insights 
              from the Australian Bureau of Statistics and Scanlon Institute research
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-number">{socialData.survey.participants.toLocaleString()}</span>
                <span className="hero-label">Survey Participants</span>
              </div>
              <div className="hero-stat">
                <span className="hero-number">{socialData.multiculturalism.goodForAustralia}%</span>
                <span className="hero-label">Support Multiculturalism</span>
              </div>
              <div className="hero-stat">
                <span className="hero-number">{absData.demographics.employment.recentGraduateEmployment}%</span>
                <span className="hero-label">Graduate Employment</span>
              </div>
            </div>
          </div>

          {/* Challenges Section */}
          <div className="challenges-section">
            <h2>🎯 Key Social Challenges We Address</h2>
            <div className="challenges-grid">
              <div className="challenge-card immigration">
                <div className="challenge-header">
                  <span className="challenge-icon">🏠</span>
                  <div>
                    <h3>Immigration Concerns</h3>
                    <span className="challenge-stat">{challenges.immigrationConcerns.percentage}%</span>
                  </div>
                </div>
                <p className="challenge-description">{challenges.immigrationConcerns.solution}</p>
                <div className="challenge-impact">
                  <strong>Our Impact:</strong> Create positive multicultural experiences that showcase the 
                  {socialData.multiculturalism.migrantsGoodForEconomy}% economic contribution of migrants
                </div>
              </div>

              <div className="challenge-card economic">
                <div className="challenge-header">
                  <span className="challenge-icon">💰</span>
                  <div>
                    <h3>Economic Pressures</h3>
                    <span className="challenge-stat">{challenges.economicPressures.percentage}%</span>
                  </div>
                </div>
                <p className="challenge-description">{challenges.economicPressures.solution}</p>
                <div className="challenge-impact">
                  <strong>Our Impact:</strong> Provide pathways to the {absData.demographics.employment.withQualificationEmployed}% 
                  employment rate enjoyed by those with qualifications
                </div>
              </div>

              <div className="challenge-card interfaith">
                <div className="challenge-header">
                  <span className="challenge-icon">🕊️</span>
                  <div>
                    <h3>Interfaith Tensions</h3>
                    <span className="challenge-stat">{challenges.interfaithTensions.percentage}%</span>
                  </div>
                </div>
                <p className="challenge-description">{challenges.interfaithTensions.solution}</p>
                <div className="challenge-impact">
                  <strong>Our Impact:</strong> Build on the {socialData.multiculturalism.enjoyMeetingDifferentCultures}% 
                  who enjoy meeting people from different cultures
                </div>
              </div>

              <div className="challenge-card safety">
                <div className="challenge-header">
                  <span className="challenge-icon">🛡️</span>
                  <div>
                    <h3>Community Safety</h3>
                    <span className="challenge-stat">{challenges.communitySafety.percentage}%</span>
                  </div>
                </div>
                <p className="challenge-description">{challenges.communitySafety.solution}</p>
                <div className="challenge-impact">
                  <strong>Our Impact:</strong> Strengthen the {socialData.communityEngagement.localAreaHelp}% 
                  community helping behavior already present
                </div>
              </div>

              <div className="challenge-card youth">
                <div className="challenge-header">
                  <span className="challenge-icon">⚡</span>
                  <div>
                    <h3>Youth Disengagement</h3>
                    <span className="challenge-stat">{challenges.youthDisengagement.percentage}%</span>
                  </div>
                </div>
                <p className="challenge-description">{challenges.youthDisengagement.solution}</p>
                <div className="challenge-impact">
                  <strong>Our Impact:</strong> Channel the {socialData.politicalParticipation.young18to34Activism}% 
                  activism rate into constructive community building
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="solutions-section">
            <h2>✨ How Art Transforms Communities</h2>
            <div className="solutions-grid">
              
              <div className="solution-card">
                <div className="solution-icon">🌉</div>
                <h3>Bridge Building</h3>
                <div className="solution-stats">
                  <div className="solution-stat">
                    <span className="stat-number">{socialData.multiculturalism.closeFriendsFromDifferentBackgrounds}%</span>
                    <span className="stat-label">Have cross-cultural friendships</span>
                  </div>
                </div>
                <p>
                  Art projects create shared experiences that naturally foster friendships across cultural lines, 
                  addressing the concerns of those worried about immigration while celebrating diversity.
                </p>
              </div>

              <div className="solution-card">
                <div className="solution-icon">🎓</div>
                <h3>Skills Development</h3>
                <div className="solution-stats">
                  <div className="solution-stat">
                    <span className="stat-number">+{absData.demographics.employment.withQualificationEmployed - absData.demographics.employment.withoutQualificationEmployed}%</span>
                    <span className="stat-label">Employment advantage with skills</span>
                  </div>
                </div>
                <p>
                  Our programs provide practical skills training aligned with the {absData.demographics.apprentices.constructionField}% 
                  of apprentices in construction, creating clear pathways to employment.
                </p>
              </div>

              <div className="solution-card">
                <div className="solution-icon">🏘️</div>
                <h3>Community Belonging</h3>
                <div className="solution-stats">
                  <div className="solution-stat">
                    <span className="stat-number">{socialData.communityEngagement.localBelonging}%</span>
                    <span className="stat-label">Feel local belonging</span>
                  </div>
                </div>
                <p>
                  Collaborative art projects strengthen the existing {socialData.communityEngagement.localAreaHelp}% 
                  helping behavior, creating stronger, more connected communities.
                </p>
              </div>

              <div className="solution-card">
                <div className="solution-icon">🌟</div>
                <h3>Positive Youth Engagement</h3>
                <div className="solution-stats">
                  <div className="solution-stat">
                    <span className="stat-number">{absData.demographics.youngPeople15to24.totalEngagement}%</span>
                    <span className="stat-label">Youth fully engaged</span>
                  </div>
                </div>
                <p>
                  Channel the {socialData.politicalParticipation.young18to34Activism}% activism rate among young adults 
                  into constructive community art projects that create lasting positive change.
                </p>
              </div>

            </div>
          </div>

          {/* Personal Impact Section */}
          {userImpact && (
            <div className="personal-impact-section">
              <h2>🎯 Your Personal Social Impact</h2>
              <div className="personal-impact-card">
                <div className="impact-score">
                  <div className="score-circle">
                    <span className="score-number">{userImpact.personalImpactScore}</span>
                    <span className="score-label">Impact Score</span>
                  </div>
                </div>
                <div className="impact-areas">
                  <h3>Your Contribution Areas:</h3>
                  <div className="areas-list">
                    {userImpact.impactAreas.map(area => (
                      <span key={area} className="impact-area-tag">{area}</span>
                    ))}
                  </div>
                </div>
                <div className="community-contribution">
                  <h3>Community Benefits You Create:</h3>
                  <ul>
                    <li>
                      <strong>Multicultural Bridging:</strong> Join the {userImpact.communityContribution.multiculturalBridging}% 
                      who see multiculturalism as beneficial
                    </li>
                    <li>
                      <strong>Local Belonging:</strong> Strengthen the {userImpact.communityContribution.localBelonging}% 
                      who feel connected to their community
                    </li>
                    <li>
                      <strong>Economic Contribution:</strong> Support the {userImpact.communityContribution.economicContribution}% 
                      positive view of economic migrant contributions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Data Sources */}
          <div className="data-sources-section">
            <h2>📊 Our Evidence Base</h2>
            <div className="sources-grid">
              <div className="source-card abs">
                <h3>Australian Bureau of Statistics</h3>
                <p className="source-subtitle">Education and Work, Australia - May 2024</p>
                <div className="source-stats">
                  <div className="source-stat">
                    <span>Survey Data:</span>
                    <span>{absData.demographics.totalPopulation15to74.toLocaleString()} people surveyed</span>
                  </div>
                  <div className="source-stat">
                    <span>Key Finding:</span>
                    <span>{absData.demographics.employment.recentGraduateEmployment}% graduate employment success</span>
                  </div>
                </div>
                <p>
                  Provides comprehensive data on education levels, employment outcomes, and skills development 
                  that inform our program design and impact measurement.
                </p>
              </div>

              <div className="source-card scanlon">
                <h3>Scanlon Institute</h3>
                <p className="source-subtitle">Mapping Social Cohesion 2024</p>
                <div className="source-stats">
                  <div className="source-stat">
                    <span>Survey Data:</span>
                    <span>{socialData.survey.participants.toLocaleString()} participants, {socialData.survey.questions}+ questions</span>
                  </div>
                  <div className="source-stat">
                    <span>Key Finding:</span>
                    <span>{socialData.multiculturalism.goodForAustralia}% support multiculturalism</span>
                  </div>
                </div>
                <p>
                  Australia's leading research on social cohesion, trust, and community engagement provides 
                  the foundation for our approach to building inclusive communities through art.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SocialImpact;