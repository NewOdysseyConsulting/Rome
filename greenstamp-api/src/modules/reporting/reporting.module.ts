import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportingController } from './reporting.controller';
import { ReportingService } from './reporting.service';
import { Activity } from '../../common/entities/activity.entity';
import { User } from '../../common/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, User]),
  ],
  controllers: [ReportingController],
  providers: [ReportingService],
  exports: [ReportingService],
})
export class ReportingModule {}