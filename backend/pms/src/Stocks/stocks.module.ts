import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock } from './entity/stocks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
