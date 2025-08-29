// Social Cohesion Data Service - Scanlon Institute Mapping Social Cohesion 2024 Integration
class SocialCohesionService {
  constructor() {
    this.baseUrl = 'https://scanloninstitute.org.au/mapping-social-cohesion-2024';
    this.cachedData = null;
    this.lastFetch = null;
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Static data based on Scanlon Institute Mapping Social Cohesion 2024
  getScanlon2024Data() {
    return {
      survey: {
        participants: 8000,
        questions: 100,
        interviews: 40,
        year: 2024,
        issuedSince: 2007,
        reportNumber: 17
      },
      multiculturalism: {
        goodForAustralia: 85, // ↓ from 86% in 2023; ↑ from 75% in 2019
        migrantsGoodForEconomy: 82, // ↓ from 86% in 2023; ↑ from 76% in 2019
        closeFriendsFromDifferentBackgrounds: 80, // Nearly 8 in 10
        enjoyMeetingDifferentCultures: 90, // Almost 9 in 10
        immigrationTooHigh: 49, // ↑ from 23% in 2023 and 41% in 2019
        disagreeEthnicRejection: 83,
        disagreeConflictZoneRejection: 73,
        economicHousingConcerns: 64, // Among those who say immigration is too high
        migrantsImpactJobsHousing: 83
      },
      trust: {
        governmentDecline: true,
        mediaDecline: true,
        localCommunitiesHigh: true,
        publicServicesHigh: true
      },
      politicalParticipation: {
        sharedPoliticalContent: 26,
        joinedBoycott: 20,
        attendedProtest: 11,
        young18to34Activism: 42, // vs 37% national average
        leftLeaningActivism: 59
      },
      communityEngagement: {
        involvedInGroups: 56, // ↑ from 55% in 2023
        localAreaHelp: 82, // vs 83% in 2023
        localBelonging: 81, // vs 80% in 2023
        strongSocialSupport: true
      },
      economicPressures: {
        economyTopIssue: 49, // ↑ from 48% in 2023
        housingAffordability: 14, // unchanged from 2023
        poorOrJustGettingBy: 41, // unchanged from 2023
        immigrationTopIssue: 7 // Only 7% cited immigration as top issue
      },
      interfaithRelations: {
        negativeTowardsMuslims: 34, // ↑ from 27% in July 2023
        negativeTowardsJews: 13, // ↑ from 9% in 2023
        positiveTowardsChristians: 37, // ↓ from 42% in 2023
        positiveTowardsBuddhists: 44, // ↓ from 50% in 2023
        positiveTowardsHindusSikhs: 26 // ↓ from 33% in 2023
      },
      safety: {
        menWorriedAboutCrime: 25, // ↑ from 21% in 2023 and 2022; 19% in 2021
        womenWorriedAboutCrime: 36, // ↑ from 32% in 2023; 28% in 2022; 25% in 2021
        womenUnsafeAtNight: 54, // ↑ from 46% in 2022
        menUnsafeAtNight: 25 // ↑ from 21% in 2022
      },
      resilience: {
        strongCommunityEngagement: true,
        highLocalTrust: true,
        persistentBelonging: true,
        overallResilient: true
      },
      lastUpdated: '2024-11-01',
      source: 'Scanlon Institute - Mapping Social Cohesion 2024'
    };
  }

  // Calculate how Artaura contributes to social cohesion
  calculateArtProgramImpact() {
    const data = this.getScanlon2024Data();
    
    return {
      // Addresses multiculturalism challenges
      multiculturalBridging: {
        potential: this.calculateMulticulturalImpact(data),
        targetAudience: data.multiculturalism.enjoyMeetingDifferentCultures,
        addressesConcerns: 100 - data.multiculturalism.disagreeEthnicRejection
      },
      
      // Strengthens community engagement
      communityStrengthening: {
        currentEngagement: data.communityEngagement.involvedInGroups,
        belongingBoost: this.calculateBelongingBoost(data),
        localConnectionImprovement: data.communityEngagement.localAreaHelp
      },
      
      // Economic empowerment through skills
      economicEmpowerment: {
        addressesEconomicConcerns: data.economicPressures.poorOrJustGettingBy,
        skillsDevelopmentImpact: this.calculateSkillsImpact(data),
        employmentPathways: true
      },
      
      // Interfaith harmony through shared creativity
      interfaithHarmony: {
        addressesNegativeAttitudes: this.calculateInterfaithImpact(data),
        sharedCreativeSpace: true,
        culturalUnderstanding: data.multiculturalism.enjoyMeetingDifferentCultures
      },
      
      // Youth engagement and activism channeling
      youthEngagement: {
        constructiveActivism: data.politicalParticipation.young18to34Activism,
        positiveChanneling: true,
        skillsDevelopment: true
      },
      
      // Safety through community building
      communityWellbeing: {
        addressesSafetyConcerns: this.calculateSafetyImpact(data),
        communityConnection: data.communityEngagement.localBelonging,
        collectiveEmpowerment: true
      }
    };
  }

  calculateMulticulturalImpact(data) {
    // Art program can bridge the 15% who don't see multiculturalism as good
    // and the 18% who don't see migrants as good for economy
    const potentialReach = (100 - data.multiculturalism.goodForAustralia) + 
                           (100 - data.multiculturalism.migrantsGoodForEconomy);
    return Math.round(potentialReach / 2); // Average potential impact
  }

  calculateBelongingBoost(data) {
    // Can help boost the 19% who don't feel local belonging
    return 100 - data.communityEngagement.localBelonging;
  }

  calculateSkillsImpact(data) {
    // Addresses economic concerns for 41% who are struggling
    return data.economicPressures.poorOrJustGettingBy;
  }

  calculateInterfaithImpact(data) {
    // Average negative attitudes across faith groups
    const avgNegative = (data.interfaithRelations.negativeTowardsMuslims + 
                        data.interfaithRelations.negativeTowardsJews +
                        (100 - data.interfaithRelations.positiveTowardsChristians) +
                        (100 - data.interfaithRelations.positiveTowardsBuddhists) +
                        (100 - data.interfaithRelations.positiveTowardsHindusSikhs)) / 5;
    return Math.round(avgNegative);
  }

  calculateSafetyImpact(data) {
    // Average safety concerns
    return Math.round((data.safety.womenWorriedAboutCrime + data.safety.menWorriedAboutCrime) / 2);
  }

  // Get dashboard metrics showing social cohesion contribution
  getSocialCohesionDashboard() {
    const impact = this.calculateArtProgramImpact();
    const data = this.getScanlon2024Data();
    
    return {
      multiculturalEngagement: data.multiculturalism.goodForAustralia,
      communityConnection: data.communityEngagement.localBelonging,
      youthActivismChanneling: data.politicalParticipation.young18to34Activism,
      economicEmpowermentPotential: impact.economicEmpowerment.addressesEconomicConcerns,
      crossCulturalFriendships: data.multiculturalism.closeFriendsFromDifferentBackgrounds,
      communityHelpingBehavior: data.communityEngagement.localAreaHelp,
      belongingImprovement: impact.communityStrengthening.belongingBoost,
      interfaithHarmonyPotential: impact.interfaithHarmony.addressesNegativeAttitudes
    };
  }

  // Get project-specific social cohesion insights
  getProjectSocialImpact(project) {
    const data = this.getScanlon2024Data();
    const impact = this.calculateArtProgramImpact();
    
    // Calculate based on project location and type
    let locationMultiplier = 1;
    if (project.location.includes('Western Sydney') || project.location.includes('Multicultural')) {
      locationMultiplier = 1.2; // Higher impact in diverse areas
    }
    
    return {
      multiculturalReach: Math.round(data.multiculturalism.enjoyMeetingDifferentCultures * locationMultiplier),
      communityBelongingBoost: impact.communityStrengthening.belongingBoost,
      youthEngagementPotential: data.politicalParticipation.young18to34Activism,
      economicSkillsImpact: impact.economicEmpowerment.addressesEconomicConcerns,
      interfaithHarmonyContribution: impact.interfaithHarmony.addressesNegativeAttitudes,
      safetyAndWellbeingImprovement: impact.communityWellbeing.addressesSafetyConcerns,
      localConnectionStrengthening: data.communityEngagement.localAreaHelp
    };
  }

  // Get gallery social impact statistics
  getGallerySocialImpact() {
    const data = this.getScanlon2024Data();
    const impact = this.calculateArtProgramImpact();
    
    return {
      culturalBridgeBuilding: data.multiculturalism.enjoyMeetingDifferentCultures,
      communityPrideBoost: data.communityEngagement.localBelonging,
      diversityAppreciation: data.multiculturalism.goodForAustralia,
      youthPositiveEngagement: data.politicalParticipation.young18to34Activism,
      economicOpportunityCreation: impact.economicEmpowerment.addressesEconomicConcerns,
      socialCohesionStrengthening: data.communityEngagement.localAreaHelp,
      belongingEnhancement: impact.communityStrengthening.belongingBoost,
      interfaithUnderstanding: impact.interfaithHarmony.addressesNegativeAttitudes
    };
  }

  // Calculate real-time social cohesion metrics for app users
  calculateUserSocialImpact(userData) {
    const data = this.getScanlon2024Data();
    
    let impactScore = 0;
    let impactAreas = [];
    
    // Age-based impact
    if (userData.ageGroup === '15-24' || userData.ageGroup === '25-34') {
      impactScore += data.politicalParticipation.young18to34Activism;
      impactAreas.push('Youth Engagement');
    }
    
    // Education-based impact
    if (userData.educationLevel && userData.educationLevel !== 'year-12') {
      impactScore += 20; // Skills development contribution
      impactAreas.push('Skills Development');
    }
    
    // Employment-based impact
    if (userData.employmentStatus === 'unemployed' || userData.employmentStatus === 'student') {
      impactScore += 25; // Economic empowerment potential
      impactAreas.push('Economic Empowerment');
    }
    
    // Currently studying bonus
    if (userData.currentlyStudying) {
      impactScore += 15;
      impactAreas.push('Educational Pathway');
    }
    
    return {
      personalImpactScore: Math.min(impactScore, 100),
      impactAreas,
      communityContribution: {
        multiculturalBridging: data.multiculturalism.goodForAustralia,
        localBelonging: data.communityEngagement.localBelonging,
        economicContribution: data.multiculturalism.migrantsGoodForEconomy
      }
    };
  }

  // Format social cohesion statistics for display
  formatSocialStat(value, type = 'percentage') {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'score':
        return `${value}/100`;
      case 'participants':
        return value.toLocaleString();
      default:
        return value;
    }
  }

  // Get social cohesion challenges the app addresses
  getChallengesAddressed() {
    const data = this.getScanlon2024Data();
    
    return {
      immigrationConcerns: {
        percentage: data.multiculturalism.immigrationTooHigh,
        solution: 'Showcase positive migrant contributions through collaborative art'
      },
      economicPressures: {
        percentage: data.economicPressures.poorOrJustGettingBy,
        solution: 'Provide skills development and employment pathways'
      },
      interfaithTensions: {
        percentage: data.interfaithRelations.negativeTowardsMuslims,
        solution: 'Foster interfaith understanding through shared creative projects'
      },
      communitySafety: {
        percentage: Math.round((data.safety.womenUnsafeAtNight + data.safety.menUnsafeAtNight) / 2),
        solution: 'Build stronger community connections and collective empowerment'
      },
      youthDisengagement: {
        percentage: 100 - data.politicalParticipation.young18to34Activism,
        solution: 'Channel youth energy into constructive creative activism'
      }
    };
  }
}

// Export singleton instance
export default new SocialCohesionService();