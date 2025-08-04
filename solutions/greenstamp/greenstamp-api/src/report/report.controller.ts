import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../common/api-key.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Report')
@Controller('report')
@UseGuards(ApiKeyGuard)
export class ReportController {
  @Get('csrd')
  @ApiOperation({ summary: 'Get CSRD ESRS-E1 report snippet' })
  @ApiResponse({ status: 200, description: 'CSRD snippet returned' })
  getCsrd() {
    // Placeholder ESRS-E1 JSON snippet
    return {
      standard: 'ESRS-E1',
      grossGHGEmissions: {
        scope1: 0,
        scope2: 0,
        scope3: 0,
      },
      intensityMetrics: {
        kgCO2ePerRevenue: null,
      },
      methodologies: ['DEFRA', 'GREET'],
      timestamp: new Date().toISOString(),
    };
  }
}