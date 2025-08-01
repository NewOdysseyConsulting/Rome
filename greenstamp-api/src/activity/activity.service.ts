import { Injectable } from '@nestjs/common';
import { EnergyActivityDto } from './dto/energy-activity.dto';
import { TransportActivityDto } from './dto/transport-activity.dto';

export interface ActivityRecord {
  id: string;
  type: 'energy' | 'transport';
  data: EnergyActivityDto | TransportActivityDto;
  /** CO2e in kilograms */
  co2eKg: number;
  timestamp: Date;
}

@Injectable()
export class ActivityService {
  private readonly activities: ActivityRecord[] = [];

  private generateId(): string {
    return (this.activities.length + 1).toString();
  }

  addEnergyActivity(dto: EnergyActivityDto): ActivityRecord {
    const record: ActivityRecord = {
      id: this.generateId(),
      type: 'energy',
      data: dto,
      co2eKg: this.mockConvertEnergy(dto.value),
      timestamp: new Date(),
    };
    this.activities.push(record);
    return record;
  }

  addTransportActivity(dto: TransportActivityDto): ActivityRecord {
    const record: ActivityRecord = {
      id: this.generateId(),
      type: 'transport',
      data: dto,
      co2eKg: this.mockConvertTransport(dto.value),
      timestamp: new Date(),
    };
    this.activities.push(record);
    return record;
  }

  /** Placeholder conversion factors */
  private mockConvertEnergy(kwh: number): number {
    const factor = 0.233; // kg CO2e per kWh (EU average placeholder)
    return kwh * factor;
  }

  private mockConvertTransport(tkm: number): number {
    const factor = 0.062; // kg CO2e per t-km (placeholder)
    return tkm * factor;
  }

  findAll(): ActivityRecord[] {
    return this.activities;
  }
}