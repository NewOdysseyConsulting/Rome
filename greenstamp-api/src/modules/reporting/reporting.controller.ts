import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ReportingService, CSRDReport } from './reporting.service';

@ApiTags('reporting')
@Controller('report')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('csrd')
  @ApiOperation({ summary: 'Generate CSRD-compliant report' })
  @ApiQuery({ name: 'startDate', example: '2024-01-01', description: 'Report start date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', example: '2024-12-31', description: 'Report end date (YYYY-MM-DD)' })
  @ApiResponse({ 
    status: 200, 
    description: 'CSRD report generated successfully',
    schema: {
      type: 'object',
      properties: {
        reportId: { type: 'string' },
        reportingPeriod: {
          type: 'object',
          properties: {
            startDate: { type: 'string' },
            endDate: { type: 'string' },
          },
        },
        organization: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            identifier: { type: 'string' },
          },
        },
        scope1Emissions: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            breakdown: {
              type: 'object',
              properties: {
                energy: { type: 'number' },
                transport: { type: 'number' },
              },
            },
          },
        },
        scope2Emissions: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            breakdown: {
              type: 'object',
              properties: {
                electricity: { type: 'number' },
                heat: { type: 'number' },
              },
            },
          },
        },
        scope3Emissions: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            breakdown: {
              type: 'object',
              properties: {
                transport: { type: 'number' },
                materials: { type: 'number' },
              },
            },
          },
        },
        totalEmissions: { type: 'number' },
        methodology: { type: 'string' },
        assurance: { type: 'string' },
        generatedAt: { type: 'string' },
      },
    },
  })
  async generateCSRDReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req,
  ): Promise<CSRDReport> {
    return this.reportingService.generateCSRDReport(req.user.id, startDate, endDate);
  }
}