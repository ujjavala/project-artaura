// ABS Data Service - Educational and Employment Statistics Integration
class ABSDataService {
  constructor() {
    this.baseUrl = 'https://www.abs.gov.au/statistics/people/education/education-and-work-australia/may-2024';
    this.cachedData = null;
    this.lastFetch = null;
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Static data based on ABS Education and Work, Australia - May 2024 + Broadening Access to Work
  getStaticABSData() {
    return {
      demographics: {
        totalPopulation15to74: 20000000, // Approximate
        youngPeople15to24: {
          totalEngagement: 81,
          fullTimeStudyPrimary: 51,
          fullTimeWorkPrimary: 25,
          notEngaged: 9,
          partiallyEngaged: 11,
          currentlyStudying: 62
        },
        qualifications: {
          nonSchoolQualification: 63,
          bachelorOrAbove: 33,
          currentlyStudying: 16,
          tafeEnrolment: 16,
          higherEducation: 42
        },
        employment: {
          withQualificationEmployed: 79,
          withoutQualificationEmployed: 58,
          recentGraduateEmployment: 84,
          skillLevel1Occupation: 45,
          skillLevel4Occupation: 22
        },
        apprentices: {
          aged15to19: 36,
          aged20to24: 35,
          malePercentage: 75,
          newStarters: 40,
          overseasBorn: 15,
          inCapitalCities: 59,
          constructionField: 26,
          electroTechField: 21
        },
        regions: {
          act: { studyEnrolment: 18, youthEngagement: 88 },
          qld: { youthEngagement: 76 },
          nsw: { studyEnrolment: 16 }, // Estimated
          tas: { studyEnrolment: 13 }
        }
      },
      // NEW: Broadening Access to Work Data (July 2024)
      employment: {
        employmentRate: {
          total: 77.1,
          male: 80.0,
          female: 74.2,
          previousYear: {
            total: 77.1, // Same as July 2023
            male: 80.3,
            female: 73.9
          },
          twentyYearChange: {
            total: 6.9, // +6.9pp from 70.2%
            male: 2.5, // +2.5pp from 77.5%
            female: 11.4 // +11.4pp from 62.8%
          }
        },
        participationRate: {
          total: 80.6,
          male: 83.9,
          female: 77.3,
          previousYear: {
            total: 80.2,
            male: 83.6,
            female: 76.8
          },
          twentyYearChange: {
            total: 6.3, // +6.3pp from 74.3%
            male: 2.0, // +2.0pp from 81.9%
            female: 10.6 // +10.6pp from 66.7%
          }
        },
        genderPayGap: {
          current: 11.5, // May 2024
          previousYear: 13.0, // May 2023
          twentyYearChange: -3.7, // Down from 15.2% in May 2004
          basedOn: 'Mean weekly ordinary time earnings of full-time adults'
        },
        diversityGroups: {
          peopleWithDisability: {
            employmentRate: 56.1, // 2022, up from 47.8% in 2018
            participationRate: 60.5, // 2022, up from 53.4% in 2018
            previousEmploymentRate: 47.8,
            previousParticipationRate: 53.4
          },
          peopleWithoutDisability: {
            employmentRate: 82.3, // 2022, up from 80.3% in 2018
            participationRate: 84.9, // 2022, up from 84.1% in 2018
            previousEmploymentRate: 80.3,
            previousParticipationRate: 84.1
          },
          aboriginalTorresStraitIslander: {
            employmentRate: 55.7, // 2021, ages 25-64, up from 51.0% in 2016
            previousEmploymentRate: 51.0, // 2016
            ageRange: '25-64 years'
          }
        }
      },
      lastUpdated: '2024-07-01',
      source: 'Australian Bureau of Statistics - Education and Work, Australia + Broadening Access to Work'
    };
  }

  // Calculate project-specific insights based on ABS data
  calculateProjectInsights(projectData) {
    const absData = this.getStaticABSData();
    
    return {
      // Youth engagement potential for the project
      youthEngagementPotential: this.calculateYouthEngagement(projectData.location, absData),
      
      // Skilled artist availability
      skilledArtistPool: this.calculateSkilledArtists(projectData.budget, absData),
      
      // Apprentice integration opportunities
      apprenticeOpportunities: this.calculateApprenticeOpportunities(projectData.tags, absData),
      
      // Education partnership potential
      educationPartnershipPotential: this.calculateEducationPartnerships(projectData.location, absData),
      
      // Employment outcome projections
      employmentOutcomes: this.calculateEmploymentOutcomes(projectData.artworks, absData)
    };
  }

  calculateYouthEngagement(location, absData) {
    let baseEngagement = absData.demographics.youngPeople15to24.totalEngagement;
    
    // Adjust based on location (using ACT and QLD as examples)
    if (location.includes('ACT') || location.includes('Canberra')) {
      baseEngagement = absData.demographics.regions.act.youthEngagement;
    } else if (location.includes('QLD') || location.includes('Queensland')) {
      baseEngagement = absData.demographics.regions.qld.youthEngagement;
    }
    
    return {
      engagementRate: baseEngagement,
      potentialParticipants: Math.round((baseEngagement / 100) * 200), // Estimate for local area
      studyingPercentage: absData.demographics.youngPeople15to24.currentlyStudying
    };
  }

  calculateSkilledArtists(budget, absData) {
    const budgetNum = parseFloat(budget.replace(/[^0-9.]/g, ''));
    const skillLevel1Percentage = absData.demographics.employment.skillLevel1Occupation;
    
    return {
      availableArtists: Math.round((budgetNum / 0.1) * (skillLevel1Percentage / 100)),
      employmentRate: absData.demographics.employment.withQualificationEmployed,
      qualifiedPercentage: absData.demographics.qualifications.nonSchoolQualification
    };
  }

  calculateApprenticeOpportunities(tags, absData) {
    let opportunities = 0;
    const apprenticeData = absData.demographics.apprentices;
    
    // Higher opportunities for construction-related projects
    if (tags.includes('Transport') || tags.includes('Infrastructure')) {
      opportunities = Math.round(apprenticeData.constructionField * 0.1);
    }
    
    if (tags.includes('Technology') || tags.includes('Digital')) {
      opportunities += Math.round(apprenticeData.electroTechField * 0.05);
    }
    
    return {
      estimatedOpportunities: Math.max(opportunities, 1),
      youthApprenticePercentage: apprenticeData.aged15to19 + apprenticeData.aged20to24,
      newStarterRate: apprenticeData.newStarters,
      diversityPotential: 100 - apprenticeData.malePercentage // Female participation potential
    };
  }

  calculateEducationPartnerships(location, absData) {
    const tafeEnrolment = absData.demographics.qualifications.tafeEnrolment;
    const higherEdEnrolment = absData.demographics.qualifications.higherEducation;
    
    return {
      tafePartnershipPotential: tafeEnrolment,
      universityPartnershipPotential: higherEdEnrolment,
      currentStudentPool: absData.demographics.qualifications.currentlyStudying,
      estimatedPartnerships: Math.round((tafeEnrolment + higherEdEnrolment) * 0.1)
    };
  }

  calculateEmploymentOutcomes(artworkCount, absData) {
    const recentGradRate = absData.demographics.employment.recentGraduateEmployment;
    const qualifiedEmploymentRate = absData.demographics.employment.withQualificationEmployed;
    
    return {
      projectedEmployment: Math.round(artworkCount * (recentGradRate / 100) * 2), // Estimate 2 artists per artwork
      employmentRate: qualifiedEmploymentRate,
      skillDevelopmentImpact: recentGradRate,
      communityBenefit: Math.round(artworkCount * 1.5) // Estimated community members engaged per artwork
    };
  }

  // Get enhanced project data with ABS insights
  enhanceProjectData(project) {
    const insights = this.calculateProjectInsights(project);
    
    return {
      ...project,
      absInsights: insights,
      communityImpact: {
        youthEngagement: insights.youthEngagementPotential,
        skillDevelopment: insights.employmentOutcomes,
        educationIntegration: insights.educationPartnershipPotential
      }
    };
  }

  // Get dashboard statistics with ABS context
  getDashboardStats() {
    const absData = this.getStaticABSData();
    
    return {
      youthEngagementRate: absData.demographics.youngPeople15to24.totalEngagement,
      employmentSuccessRate: absData.demographics.employment.recentGraduateEmployment,
      qualificationBenefit: absData.demographics.employment.withQualificationEmployed - absData.demographics.employment.withoutQualificationEmployed,
      apprenticeIntegration: absData.demographics.apprentices.constructionField,
      educationPartnership: absData.demographics.qualifications.tafeEnrolment + absData.demographics.qualifications.higherEducation,
      skillLevel1Artists: absData.demographics.employment.skillLevel1Occupation
    };
  }

  // Get gallery statistics with community engagement context
  getGalleryStats() {
    const absData = this.getStaticABSData();
    
    return {
      communityReach: absData.demographics.qualifications.currentlyStudying,
      diversityIndex: 100 - absData.demographics.apprentices.malePercentage,
      educationImpact: absData.demographics.youngPeople15to24.currentlyStudying,
      skillDevelopment: absData.demographics.employment.skillLevel1Occupation,
      youthParticipation: absData.demographics.youngPeople15to24.totalEngagement
    };
  }

  // NEW: Get employment opportunity insights for projects
  getEmploymentOpportunities() {
    const absData = this.getStaticABSData();
    const employment = absData.employment;
    
    return {
      totalEmploymentRate: employment.employmentRate.total,
      femaleEmploymentGrowth: employment.employmentRate.twentyYearChange.female,
      genderPayGap: employment.genderPayGap.current,
      disabilityEmploymentGap: employment.diversityGroups.peopleWithoutDisability.employmentRate - employment.diversityGroups.peopleWithDisability.employmentRate,
      indigenousEmploymentRate: employment.diversityGroups.aboriginalTorresStraitIslander.employmentRate,
      participationRate: employment.participationRate.total,
      diversityTargets: {
        femaleParticipation: employment.participationRate.female,
        disabilityInclusion: employment.diversityGroups.peopleWithDisability.employmentRate,
        indigenousEngagement: employment.diversityGroups.aboriginalTorresStraitIslander.employmentRate
      }
    };
  }

  // NEW: Calculate workforce diversity metrics for projects
  calculateWorkforceDiversity(projectData) {
    const empData = this.getEmploymentOpportunities();
    
    return {
      femaleArtistTargets: Math.round((empData.diversityTargets.femaleParticipation / 100) * projectData.artworks),
      disabilityInclusionOpportunities: Math.round((empData.diversityTargets.disabilityInclusion / 100) * projectData.artworks),
      indigenousArtistSlots: Math.round((empData.diversityTargets.indigenousEngagement / 100) * projectData.artworks),
      payEquityCommitment: 100 - empData.genderPayGap, // Percentage commitment to pay equity
      totalDiversityScore: Math.round((empData.diversityTargets.femaleParticipation + empData.diversityTargets.disabilityInclusion + empData.diversityTargets.indigenousEngagement) / 3)
    };
  }

  // Format ABS data for display
  formatStatistic(value, type = 'percentage') {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'number':
        return value.toLocaleString();
      case 'currency':
        return `$${value.toLocaleString()}`;
      default:
        return value;
    }
  }
}

// Export singleton instance
export default new ABSDataService();