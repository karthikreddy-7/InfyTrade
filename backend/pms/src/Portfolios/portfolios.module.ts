import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio } from './entity/portfolios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  controllers: [PortfoliosController],
  providers: [PortfoliosService]
})
export class PortfoliosModule {}
