import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { Dashboard } from './entity/dashboards.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard])],
  controllers: [DashboardsController],
  providers: [DashboardsService]
})
export class DashboardsModule {}
