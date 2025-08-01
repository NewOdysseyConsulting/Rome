import { IsString, IsNumber, IsArray, IsOptional, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePassportDto {
  @ApiProperty({ example: 'PROD-001', description: 'Unique product identifier' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 'Eco-Friendly Widget', description: 'Product name' })
  @IsString()
  productName: string;

  @ApiProperty({ example: 'GreenCorp Ltd', description: 'Manufacturer name' })
  @IsString()
  manufacturer: string;

  @ApiProperty({ 
    example: ['recycled_plastic', 'organic_cotton'], 
    description: 'List of materials used' 
  })
  @IsArray()
  @IsString({ each: true })
  materials: string[];

  @ApiProperty({ 
    example: 2.5, 
    description: 'Carbon footprint in kg CO2e' 
  })
  @IsNumber()
  @Min(0)
  carbonFootprint: number;

  @ApiProperty({ 
    example: '2024-01-15', 
    description: 'Manufacturing date' 
  })
  @IsString()
  @IsOptional()
  manufacturingDate?: string;

  @ApiProperty({ 
    example: 'https://example.com/product-info', 
    description: 'Additional product information URL' 
  })
  @IsUrl()
  @IsOptional()
  productUrl?: string;
}

export class PassportResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  carbonFootprint: number;

  @ApiProperty()
  jsonLd: object;

  @ApiProperty()
  qrCodeUrl: string;

  @ApiProperty()
  createdAt: Date;
}