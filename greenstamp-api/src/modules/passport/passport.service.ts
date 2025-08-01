import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as QRCode from 'qrcode';
import { Passport } from '../../common/entities/passport.entity';
import { User } from '../../common/entities/user.entity';
import { CreatePassportDto, PassportResponseDto } from '../../common/dto/passport.dto';

@Injectable()
export class PassportService {
  constructor(
    @InjectRepository(Passport)
    private passportRepository: Repository<Passport>,
  ) {}

  async createPassport(
    createPassportDto: CreatePassportDto,
    user: User,
  ): Promise<PassportResponseDto> {
    // Generate JSON-LD structured data
    const jsonLd = this.generateJsonLd(createPassportDto, user);

    // Generate QR code
    const qrCodeUrl = await this.generateQRCode(jsonLd);

    // Create passport record
    const passport = this.passportRepository.create({
      ...createPassportDto,
      jsonLd,
      qrCodeUrl,
      userId: user.id,
    });

    const savedPassport = await this.passportRepository.save(passport);

    return this.mapToResponseDto(savedPassport);
  }

  async getPassportById(id: string, userId: string): Promise<PassportResponseDto> {
    const passport = await this.passportRepository.findOne({
      where: { id, userId },
    });

    if (!passport) {
      throw new Error('Passport not found');
    }

    return this.mapToResponseDto(passport);
  }

  async getUserPassports(userId: string): Promise<PassportResponseDto[]> {
    const passports = await this.passportRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return passports.map(passport => this.mapToResponseDto(passport));
  }

  private generateJsonLd(createPassportDto: CreatePassportDto, user: User): object {
    const now = new Date().toISOString();
    
    return {
      '@context': {
        '@vocab': 'https://schema.org/',
        'gs': 'https://greenstamp.com/schema/',
      },
      '@type': 'Product',
      '@id': `https://greenstamp.com/passport/${createPassportDto.productId}`,
      'name': createPassportDto.productName,
      'manufacturer': {
        '@type': 'Organization',
        'name': createPassportDto.manufacturer,
      },
      'gs:carbonFootprint': {
        '@type': 'QuantitativeValue',
        'value': createPassportDto.carbonFootprint,
        'unitCode': 'KGM', // kg CO2e
      },
      'gs:materials': createPassportDto.materials,
      'gs:passportIssuer': {
        '@type': 'Organization',
        'name': user.companyName,
      },
      'gs:passportIssueDate': now,
      'gs:complianceStandard': 'CSRD',
      'gs:passportVersion': '1.0',
      ...(createPassportDto.manufacturingDate && {
        'gs:manufacturingDate': createPassportDto.manufacturingDate,
      }),
      ...(createPassportDto.productUrl && {
        'url': createPassportDto.productUrl,
      }),
    };
  }

  private async generateQRCode(jsonLd: object): Promise<string> {
    try {
      const jsonString = JSON.stringify(jsonLd);
      const qrCodeDataUrl = await QRCode.toDataURL(jsonString, {
        errorCorrectionLevel: 'M',
        margin: 1,
      });

      // In a real implementation, you would upload this to a cloud storage service
      // For now, we'll return a placeholder URL
      return `https://api.greenstamp.com/qr/${Date.now()}.png`;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  }

  private mapToResponseDto(passport: Passport): PassportResponseDto {
    return {
      id: passport.id,
      productId: passport.productId,
      productName: passport.productName,
      manufacturer: passport.manufacturer,
      carbonFootprint: passport.carbonFootprint,
      jsonLd: passport.jsonLd,
      qrCodeUrl: passport.qrCodeUrl,
      createdAt: passport.createdAt,
    };
  }
}