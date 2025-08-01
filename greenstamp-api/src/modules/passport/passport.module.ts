import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportController } from './passport.controller';
import { PassportService } from './passport.service';
import { Passport } from '../../common/entities/passport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passport]),
  ],
  controllers: [PassportController],
  providers: [PassportService],
  exports: [PassportService],
})
export class PassportModule {}