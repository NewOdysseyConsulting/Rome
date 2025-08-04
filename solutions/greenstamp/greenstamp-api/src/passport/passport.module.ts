import { Module } from '@nestjs/common';
import { PassportController } from './passport.controller';

@Module({
  controllers: [PassportController],
})
export class PassportModule {}