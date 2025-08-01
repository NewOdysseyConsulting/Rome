import { IsEnum, IsNumber, IsString, IsOptional, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnergyType, TransportMode } from '../entities/activity.entity';

export class EnergyActivityDto {
  @ApiProperty({ example: 1000, description: 'Energy consumption in kWh' })
  @IsNumber()
  @Min(0)
  kwh: number;

  @ApiProperty({ 
    enum: EnergyType, 
    example: EnergyType.ELECTRICITY,
    description: 'Type of energy consumed'
  })
  @IsEnum(EnergyType)
  energyType: EnergyType;

  @ApiProperty({ example: 'EU', description: 'Geographic region' })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'Activity timestamp' })
  @IsDateString()
  timestamp: string;

  @ApiProperty({ example: 'Office electricity consumption', description: 'Optional description' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class TransportActivityDto {
  @ApiProperty({ example: 500, description: 'Transport distance in t-km' })
  @IsNumber()
  @Min(0)
  tkm: number;

  @ApiProperty({ 
    enum: TransportMode, 
    example: TransportMode.ROAD,
    description: 'Transport mode used'
  })
  @IsEnum(TransportMode)
  transportMode: TransportMode;

  @ApiProperty({ example: 'EU', description: 'Geographic region' })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'Activity timestamp' })
  @IsDateString()
  timestamp: string;

  @ApiProperty({ example: 'Raw materials transport', description: 'Optional description' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class ActivityResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  calculatedCO2e: number;

  @ApiProperty()
  activityDate: Date;

  @ApiProperty()
  createdAt: Date;
}