import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { Ranking } from './entity/rankings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking])],
  controllers: [RankingsController],
  providers: [RankingsService]
})
export class RankingsModule {}
