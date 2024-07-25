import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stocks } from './entity/stocks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stocks])],
  controllers: [StocksController],
  providers: [StocksService]
})
export class StocksModule {}
