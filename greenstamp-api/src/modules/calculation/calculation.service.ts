import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmissionFactor, FactorType } from '../../common/entities/emission-factor.entity';
import { EnergyType, TransportMode } from '../../common/entities/activity.entity';

@Injectable()
export class CalculationService {
  constructor(
    @InjectRepository(EmissionFactor)
    private emissionFactorRepository: Repository<EmissionFactor>,
  ) {}

  async calculateEnergyCO2e(
    kwh: number,
    energyType: EnergyType,
    region: string = 'EU',
  ): Promise<number> {
    const factor = await this.getEmissionFactor(
      FactorType.ENERGY,
      energyType,
      region,
    );

    return kwh * factor;
  }

  async calculateTransportCO2e(
    tkm: number,
    transportMode: TransportMode,
    region: string = 'EU',
  ): Promise<number> {
    const factor = await this.getEmissionFactor(
      FactorType.TRANSPORT,
      transportMode,
      region,
    );

    return tkm * factor;
  }

  async calculateMaterialCO2e(
    quantity: number,
    material: string,
    region: string = 'EU',
  ): Promise<number> {
    const factor = await this.getEmissionFactor(
      FactorType.MATERIAL,
      material,
      region,
    );

    return quantity * factor;
  }

  private async getEmissionFactor(
    type: FactorType,
    category: string,
    region: string,
  ): Promise<number> {
    const now = new Date();
    
    const factor = await this.emissionFactorRepository.findOne({
      where: {
        type,
        category,
        region,
        isActive: true,
        validFrom: { $lte: now } as any,
        validTo: { $gte: now } as any,
      },
      order: { validFrom: 'DESC' },
    });

    if (!factor) {
      // Fallback to default EU factors if region-specific not found
      const defaultFactor = await this.emissionFactorRepository.findOne({
        where: {
          type,
          category,
          region: 'EU',
          isActive: true,
          validFrom: { $lte: now } as any,
          validTo: { $gte: now } as any,
        },
        order: { validFrom: 'DESC' },
      });

      if (!defaultFactor) {
        throw new NotFoundException(
          `No emission factor found for ${type}/${category} in region ${region}`,
        );
      }

      return defaultFactor.factor;
    }

    return factor.factor;
  }

  async getEmissionFactors(): Promise<EmissionFactor[]> {
    return this.emissionFactorRepository.find({
      where: { isActive: true },
      order: { type: 'ASC', category: 'ASC' },
    });
  }

  async updateEmissionFactor(factor: Partial<EmissionFactor>): Promise<EmissionFactor> {
    const existingFactor = await this.emissionFactorRepository.findOne({
      where: { id: factor.id },
    });

    if (!existingFactor) {
      throw new NotFoundException('Emission factor not found');
    }

    Object.assign(existingFactor, factor);
    return this.emissionFactorRepository.save(existingFactor);
  }
}