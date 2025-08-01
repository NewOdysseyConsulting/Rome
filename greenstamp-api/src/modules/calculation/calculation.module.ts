import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationService } from './calculation.service';
import { EmissionFactor } from '../../common/entities/emission-factor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmissionFactor]),
  ],
  providers: [CalculationService],
  exports: [CalculationService],
})
export class CalculationModule {}