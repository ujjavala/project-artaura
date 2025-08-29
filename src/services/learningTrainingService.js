// Australian Work-Related Training and Adult Learning Service (2020-21)
// Based on ABS Work-Related Training and Adult Learning data

class LearningTrainingService {
  constructor() {
    this.dataYear = '2020-21';
    this.basePopulation = 18800000; // Ages 15-74
  }

  // Core learning participation statistics
  getLearningParticipationData() {
    return {
      overall: {
        totalParticipants: 7800000, // 42% of 18.8M
        participationRate: 42,
        totalPopulation: this.basePopulation
      },
      formalStudy: {
        participants: 3800000, // 21%
        participationRate: 21,
        trend: 'stable' // Steady since 2013
      },
      nonFormalLearning: {
        participants: 5100000, // 27%
        participationRate: 27,
        previousRate: 32, // 2013
        decline: -5 // Percentage point decline
      },
      bothTypes: {
        participants: 1100000, // 6%
        participationRate: 6
      }
    };
  }

  // Work-related training specific data
  getWorkRelatedTraining() {
    return {
      participants: {
        total: 4400000,
        participationRate: 23,
        previousRate: 27, // 2013
        decline: -4 // Percentage point decline
      },
      motivations: {
        increaseJobSkills: 91,
        improveJobProspects: 5,
        other: 4
      },
      demographics: {
        women: 24,
        men: 23,
        employedWomen: 35,
        employedMen: 30,
        workingAge20to64: 27,
        young15to19: 12,
        older65to74: 6
      },
      byJobType: {
        employees: 33,
        businessOwners: 15,
        highSkillJobs: 40,
        lowSkillJobs: 19
      },
      courseLoad: {
        singleCourse: 33,
        multipleCourses: 67,
        threePlusCourses: 48
      },
      timeCommitment: {
        lessThan10Hours: 42,
        between10and19Hours: 20,
        twentyPlusHours: 38,
        menLongCourses: 42,
        womenLongCourses: 34
      },
      costs: {
        paidForTraining: 14,
        businessOwnersPaid: 50,
        employeesPaid: 10,
        largeBizNoCost: 94,
        smallBizNoCost: 67
      },
      delivery: {
        online: 55,
        onlinePrevious: 19, // 2016-17
        classroom: 37,
        fieldWork: 9
      }
    };
  }

  // Personal interest learning data
  getPersonalInterestLearning() {
    return {
      participants: {
        total: 1200000,
        participationRate: 6,
        women: 7,
        men: 5,
        multipleCourses: 35
      },
      motivations: {
        gainNewSkills: 39,
        enjoymentInterest: 33,
        personalDevelopment: 23
      },
      demographics: {
        bachelorDegree: 10,
        noDegree: 5,
        actHighest: 9,
        disadvantagedAreas: 5,
        leastDisadvantaged: 8,
        fullTimeWorkingWomen: 9,
        partTimeUnemployedWomen: 7,
        womenWithChildren: 6,
        womenWithoutChildren: 8
      },
      costs: {
        free: 35,
        spent200Plus: 40,
        lowestIncomeNoPay: 47
      }
    };
  }

  // Barriers to study data
  getStudyBarriers() {
    return {
      wantedButCouldnt: {
        total: 924000,
        participationRate: 5,
        bachelorLevel: 2,
        certDiplomaLevel: 3
      },
      barriers: {
        timeWork: {
          women: 34,
          men: 40
        },
        financial: {
          women: 35,
          men: 31
        },
        personal: {
          women: 18,
          men: 6
        },
        courseAvailability: 12
      },
      higherBarrierGroups: {
        unemployed: 10,
        employed: 5,
        notInLabourForce: 3,
        mostDisadvantaged: 6,
        leastDisadvantaged: 4,
        oneParentHouseholds: 8,
        coupleFamilies: 6
      }
    };
  }

  // Calculate learning opportunities for Artaura projects
  calculateArtLearningOpportunities(projectData) {
    const workTraining = this.getWorkRelatedTraining();
    const personalLearning = this.getPersonalInterestLearning();
    
    return {
      workRelatedArtTraining: {
        potentialParticipants: Math.round(projectData.artworks * (workTraining.participants.participationRate / 100) * 50), // Estimate 50 people per artwork
        onlineDeliveryPreference: workTraining.delivery.online,
        skillDevelopmentFocus: workTraining.motivations.increaseJobSkills,
        femaleEngagement: workTraining.demographics.employedWomen
      },
      personalInterestArt: {
        potentialParticipants: Math.round(projectData.artworks * (personalLearning.participants.participationRate / 100) * 30), // Estimate 30 people per artwork
        enjoymentMotivation: personalLearning.motivations.enjoymentInterest,
        skillGainMotivation: personalLearning.motivations.gainNewSkills,
        femaleParticipation: personalLearning.participants.women
      },
      combinedOpportunity: {
        totalPotentialLearners: Math.round(projectData.artworks * 20), // Conservative estimate
        onlineLearningCapacity: workTraining.delivery.online,
        barrierMitigation: {
          timeFlexibility: 100 - workTraining.barriers?.timeWork?.women || 66, // Address time barriers
          financialSupport: 100 - workTraining.barriers?.financial?.women || 65, // Address financial barriers
          accessibilityFocus: personalLearning.demographics.disadvantagedAreas
        }
      }
    };
  }

  // Calculate workforce development impact
  calculateWorkforceDevelopmentImpact(projectData) {
    const training = this.getWorkRelatedTraining();
    
    return {
      skillsUpgradePotential: {
        highSkillJobsTarget: training.byJobType.highSkillJobs,
        lowSkillJobsOpportunity: training.byJobType.lowSkillJobs,
        employeeEngagement: training.byJobType.employees,
        businessOwnerEngagement: training.byJobType.businessOwners
      },
      trainingDelivery: {
        onlineReadiness: training.delivery.online,
        hybridCapability: training.delivery.classroom + training.delivery.fieldWork,
        flexibleLearning: training.timeCommitment.lessThan10Hours
      },
      genderEquity: {
        femaleAdvantage: training.demographics.employedWomen - training.demographics.employedMen, // +5 percentage points
        longCourseGap: training.timeCommitment.menLongCourses - training.timeCommitment.womenLongCourses, // +8 for men
        targetFemaleEngagement: training.demographics.employedWomen
      },
      costEffectiveness: {
        employerFunding: 100 - training.costs.paidForTraining, // 86% employer funded
        largeBizSupport: training.costs.largeBizNoCost,
        smallBizChallenge: 100 - training.costs.smallBizNoCost // 33% pay personally
      }
    };
  }

  // Get learning integration recommendations for art projects
  getArtLearningIntegration(projectData) {
    const participation = this.getLearningParticipationData();
    const barriers = this.getStudyBarriers();
    
    return {
      recommendations: {
        formalArtEducation: {
          potential: participation.formalStudy.participationRate,
          strategy: 'Partner with TAFE and universities for certified art programs',
          target: 'Maintain stable 21% participation in formal art study'
        },
        informalArtWorkshops: {
          potential: participation.nonFormalLearning.participationRate,
          strategy: 'Reverse declining trend through engaging community art workshops',
          challenge: `Address ${Math.abs(participation.nonFormalLearning.decline)}pp decline since 2013`
        },
        workIntegratedLearning: {
          potential: this.getWorkRelatedTraining().participants.participationRate,
          strategy: 'Integrate art skills with construction and infrastructure training',
          focus: 'Address skills gap while creating beautiful public spaces'
        }
      },
      barrierMitigation: {
        timeConstraints: {
          issue: `${barriers.barriers.timeWork.women}% women, ${barriers.barriers.timeWork.men}% men cite time/work barriers`,
          solution: 'Flexible, modular art learning programs that fit work schedules'
        },
        financialBarriers: {
          issue: `${barriers.barriers.financial.women}% women, ${barriers.barriers.financial.men}% men cite financial barriers`,
          solution: 'Employer-sponsored art training and free community workshops'
        },
        personalBarriers: {
          issue: `${barriers.barriers.personal.women}% women cite personal barriers vs ${barriers.barriers.personal.men}% men`,
          solution: 'Childcare support and family-friendly art learning environments'
        }
      },
      specialFocus: {
        unemployedEngagement: {
          rate: barriers.higherBarrierGroups.unemployed,
          opportunity: 'Art skills training as pathway to employment',
          approach: 'Double the engagement compared to employed (10% vs 5%)'
        },
        disadvantagedCommunities: {
          barriers: barriers.higherBarrierGroups.mostDisadvantaged,
          solution: 'Targeted outreach and support in most disadvantaged areas',
          personalLearning: this.getPersonalInterestLearning().demographics.disadvantagedAreas
        }
      }
    };
  }

  // Format learning statistics for display
  formatLearningStatistic(value, type = 'percentage') {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'participants':
        return `${(value / 1000000).toFixed(1)}M`;
      case 'thousands':
        return `${(value / 1000).toFixed(0)}K`;
      case 'difference':
        return value > 0 ? `+${value}pp` : `${value}pp`;
      default:
        return value.toLocaleString();
    }
  }

  // Get dashboard statistics with learning context
  getLearningDashboardStats() {
    const participation = this.getLearningParticipationData();
    const workTraining = this.getWorkRelatedTraining();
    const personalLearning = this.getPersonalInterestLearning();
    
    return {
      totalLearningParticipation: participation.overall.participationRate,
      workRelatedTraining: workTraining.participants.participationRate,
      personalInterestLearning: personalLearning.participants.participationRate,
      onlineLearningGrowth: workTraining.delivery.online - workTraining.delivery.onlinePrevious, // +36pp
      femaleAdvantageInTraining: workTraining.demographics.employedWomen - workTraining.demographics.employedMen, // +5pp
      skillDevelopmentMotivation: workTraining.motivations.increaseJobSkills
    };
  }
}

// Export singleton instance
export default new LearningTrainingService();