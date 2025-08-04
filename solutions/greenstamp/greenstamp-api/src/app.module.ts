import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './activity/activity.module';
import { ReportModule } from './report/report.module';
import { PassportModule } from './passport/passport.module';

@Module({
  imports: [ActivityModule, ReportModule, PassportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
