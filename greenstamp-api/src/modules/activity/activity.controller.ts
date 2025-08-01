import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ActivityService } from './activity.service';
import { EnergyActivityDto, TransportActivityDto, ActivityResponseDto } from '../../common/dto/activity.dto';
import { User } from '../../common/entities/user.entity';

@ApiTags('activity')
@Controller('activity')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('energy')
  @ApiOperation({ summary: 'Submit energy consumption data' })
  @ApiResponse({ 
    status: 201, 
    description: 'Energy activity submitted successfully',
    type: ActivityResponseDto 
  })
  async submitEnergyActivity(
    @Body() energyDto: EnergyActivityDto,
    @Request() req,
  ): Promise<ActivityResponseDto> {
    return this.activityService.submitEnergyActivity(energyDto, req.user);
  }

  @Post('transport')
  @ApiOperation({ summary: 'Submit transport data' })
  @ApiResponse({ 
    status: 201, 
    description: 'Transport activity submitted successfully',
    type: ActivityResponseDto 
  })
  async submitTransportActivity(
    @Body() transportDto: TransportActivityDto,
    @Request() req,
  ): Promise<ActivityResponseDto> {
    return this.activityService.submitTransportActivity(transportDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get user activities' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of user activities',
    type: [ActivityResponseDto] 
  })
  async getUserActivities(@Request() req): Promise<ActivityResponseDto[]> {
    return this.activityService.getUserActivities(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific activity by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Activity details',
    type: ActivityResponseDto 
  })
  async getActivityById(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ActivityResponseDto> {
    return this.activityService.getActivityById(id, req.user.id);
  }
}