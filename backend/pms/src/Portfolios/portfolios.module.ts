import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio } from './entity/portfolios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { holding } from 'src/holdings/entity/holdings.entity';
import { holdingsService } from 'src/holdings/holdings.service';
import { holdingsModule } from 'src/holdings/holdings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, holding]),holdingsModule],
  providers: [PortfoliosService],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}
