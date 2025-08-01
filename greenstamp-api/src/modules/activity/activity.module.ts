import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { Activity } from '../../common/entities/activity.entity';
import { CalculationModule } from '../calculation/calculation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    CalculationModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}