import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PassportService } from './passport.service';
import { CreatePassportDto, PassportResponseDto } from '../../common/dto/passport.dto';

@ApiTags('passport')
@Controller('passport')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a Digital Product Passport' })
  @ApiResponse({ 
    status: 201, 
    description: 'Digital Product Passport created successfully',
    type: PassportResponseDto 
  })
  async createPassport(
    @Body() createPassportDto: CreatePassportDto,
    @Request() req,
  ): Promise<PassportResponseDto> {
    return this.passportService.createPassport(createPassportDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get user passports' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of user passports',
    type: [PassportResponseDto] 
  })
  async getUserPassports(@Request() req): Promise<PassportResponseDto[]> {
    return this.passportService.getUserPassports(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific passport by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Passport details',
    type: PassportResponseDto 
  })
  async getPassportById(
    @Param('id') id: string,
    @Request() req,
  ): Promise<PassportResponseDto> {
    return this.passportService.getPassportById(id, req.user.id);
  }
}