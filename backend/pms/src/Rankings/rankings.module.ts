import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { Rankings } from './entity/rankings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rankings])],
  controllers: [RankingsController],
  providers: [RankingsService]
})
export class RankingsModule {}
