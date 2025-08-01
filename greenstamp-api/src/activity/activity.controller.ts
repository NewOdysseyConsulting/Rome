import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { EnergyActivityDto } from './dto/energy-activity.dto';
import { TransportActivityDto } from './dto/transport-activity.dto';
import { ApiKeyGuard } from '../common/api-key.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Activity')
@Controller('activity')
@UseGuards(ApiKeyGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('energy')
  @ApiOperation({ summary: 'Record energy consumption activity' })
  @ApiResponse({ status: 201, description: 'Energy activity recorded' })
  addEnergy(@Body() dto: EnergyActivityDto) {
    return this.activityService.addEnergyActivity(dto);
  }

  @Post('transport')
  @ApiOperation({ summary: 'Record transport freight activity' })
  @ApiResponse({ status: 201, description: 'Transport activity recorded' })
  addTransport(@Body() dto: TransportActivityDto) {
    return this.activityService.addTransportActivity(dto);
  }
}