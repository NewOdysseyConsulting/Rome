import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Activity, ActivityType } from '../../common/entities/activity.entity';
import { User } from '../../common/entities/user.entity';

export interface CSRDReport {
  reportId: string;
  reportingPeriod: {
    startDate: string;
    endDate: string;
  };
  organization: {
    name: string;
    identifier: string;
  };
  scope1Emissions: {
    total: number;
    breakdown: {
      energy: number;
      transport: number;
    };
  };
  scope2Emissions: {
    total: number;
    breakdown: {
      electricity: number;
      heat: number;
    };
  };
  scope3Emissions: {
    total: number;
    breakdown: {
      transport: number;
      materials: number;
    };
  };
  totalEmissions: number;
  methodology: string;
  assurance: string;
  generatedAt: string;
}

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateCSRDReport(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<CSRDReport> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Get activities for the reporting period
    const activities = await this.activityRepository.find({
      where: {
        userId,
        activityDate: Between(new Date(startDate), new Date(endDate)),
      },
    });

    // Calculate emissions by scope
    const scope1Emissions = this.calculateScope1Emissions(activities);
    const scope2Emissions = this.calculateScope2Emissions(activities);
    const scope3Emissions = this.calculateScope3Emissions(activities);

    const totalEmissions = scope1Emissions.total + scope2Emissions.total + scope3Emissions.total;

    return {
      reportId: `CSRD-${user.companyName.replace(/\s+/g, '-')}-${Date.now()}`,
      reportingPeriod: {
        startDate,
        endDate,
      },
      organization: {
        name: user.companyName,
        identifier: user.id,
      },
      scope1Emissions,
      scope2Emissions,
      scope3Emissions,
      totalEmissions,
      methodology: 'GreenStamp API - EU Emission Factors',
      assurance: 'Self-declared',
      generatedAt: new Date().toISOString(),
    };
  }

  private calculateScope1Emissions(activities: Activity[]): { total: number; breakdown: { energy: number; transport: number } } {
    const energyActivities = activities.filter(a => a.type === ActivityType.ENERGY);
    const transportActivities = activities.filter(a => a.type === ActivityType.TRANSPORT);

    const energyEmissions = energyActivities.reduce((sum, activity) => sum + (activity.calculatedCO2e || 0), 0);
    const transportEmissions = transportActivities.reduce((sum, activity) => sum + (activity.calculatedCO2e || 0), 0);

    return {
      total: energyEmissions + transportEmissions,
      breakdown: {
        energy: energyEmissions,
        transport: transportEmissions,
      },
    };
  }

  private calculateScope2Emissions(activities: Activity[]): { total: number; breakdown: { electricity: number; heat: number } } {
    // For MVP, we'll assume all energy activities are scope 2
    // In a real implementation, you'd differentiate based on energy source
    const energyActivities = activities.filter(a => a.type === ActivityType.ENERGY);
    const totalEmissions = energyActivities.reduce((sum, activity) => sum + (activity.calculatedCO2e || 0), 0);

    return {
      total: totalEmissions,
      breakdown: {
        electricity: totalEmissions * 0.8, // Assume 80% electricity
        heat: totalEmissions * 0.2, // Assume 20% heat
      },
    };
  }

  private calculateScope3Emissions(activities: Activity[]): { total: number; breakdown: { transport: number; materials: number } } {
    // For MVP, we'll assume transport activities are scope 3
    // In a real implementation, you'd have more detailed categorization
    const transportActivities = activities.filter(a => a.type === ActivityType.TRANSPORT);
    const transportEmissions = transportActivities.reduce((sum, activity) => sum + (activity.calculatedCO2e || 0), 0);

    return {
      total: transportEmissions,
      breakdown: {
        transport: transportEmissions,
        materials: 0, // Not implemented in MVP
      },
    };
  }

  async getUserReports(userId: string): Promise<CSRDReport[]> {
    // This would typically query a reports table
    // For MVP, we'll return an empty array
    return [];
  }
}