import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../common/api-key.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as QRCode from 'qrcode';

interface PassportRequest {
  productId: string;
  name: string;
  batch: string;
}

@ApiTags('Passport')
@Controller('passport')
@UseGuards(ApiKeyGuard)
export class PassportController {
  @Post()
  @ApiOperation({ summary: 'Generate Digital Product Passport (DPP)' })
  @ApiResponse({ status: 201, description: 'DPP generated' })
  async generate(@Body() body: PassportRequest) {
    const jsonld = {
      '@context': 'https://european-union.github.io/product-passport/context.jsonld',
      id: `urn:uuid:${body.productId}`,
      type: 'DigitalProductPassport',
      name: body.name,
      batch: body.batch,
      timestamp: new Date().toISOString(),
    };

    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(jsonld));

    return {
      dpp: jsonld,
      qrDataUrl,
    };
  }
}