import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity, ActivityType, EnergyType, TransportMode } from '../../common/entities/activity.entity';
import { User } from '../../common/entities/user.entity';
import { EnergyActivityDto, TransportActivityDto, ActivityResponseDto } from '../../common/dto/activity.dto';
import { CalculationService } from '../calculation/calculation.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    private calculationService: CalculationService,
  ) {}

  async submitEnergyActivity(
    energyDto: EnergyActivityDto,
    user: User,
  ): Promise<ActivityResponseDto> {
    // Calculate CO2e
    const co2e = await this.calculationService.calculateEnergyCO2e(
      energyDto.kwh,
      energyDto.energyType,
      energyDto.region,
    );

    // Create activity record
    const activity = this.activityRepository.create({
      type: ActivityType.ENERGY,
      quantity: energyDto.kwh,
      unit: 'kWh',
      energyType: energyDto.energyType,
      region: energyDto.region,
      description: energyDto.description,
      calculatedCO2e: co2e,
      activityDate: new Date(energyDto.timestamp),
      userId: user.id,
    });

    const savedActivity = await this.activityRepository.save(activity);

    return this.mapToResponseDto(savedActivity);
  }

  async submitTransportActivity(
    transportDto: TransportActivityDto,
    user: User,
  ): Promise<ActivityResponseDto> {
    // Calculate CO2e
    const co2e = await this.calculationService.calculateTransportCO2e(
      transportDto.tkm,
      transportDto.transportMode,
      transportDto.region,
    );

    // Create activity record
    const activity = this.activityRepository.create({
      type: ActivityType.TRANSPORT,
      quantity: transportDto.tkm,
      unit: 't-km',
      transportMode: transportDto.transportMode,
      region: transportDto.region,
      description: transportDto.description,
      calculatedCO2e: co2e,
      activityDate: new Date(transportDto.timestamp),
      userId: user.id,
    });

    const savedActivity = await this.activityRepository.save(activity);

    return this.mapToResponseDto(savedActivity);
  }

  async getUserActivities(userId: string): Promise<ActivityResponseDto[]> {
    const activities = await this.activityRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return activities.map(activity => this.mapToResponseDto(activity));
  }

  async getActivityById(id: string, userId: string): Promise<ActivityResponseDto> {
    const activity = await this.activityRepository.findOne({
      where: { id, userId },
    });

    if (!activity) {
      throw new Error('Activity not found');
    }

    return this.mapToResponseDto(activity);
  }

  private mapToResponseDto(activity: Activity): ActivityResponseDto {
    return {
      id: activity.id,
      type: activity.type,
      quantity: activity.quantity,
      unit: activity.unit,
      calculatedCO2e: activity.calculatedCO2e,
      activityDate: activity.activityDate,
      createdAt: activity.createdAt,
    };
  }
}