import { Injectable } from '@nestjs/common';
import { CreateStocksDto } from './dto/stocks.create.dto';
import { UpdateStocksDto } from './dto/stocks.update.dto';

@Injectable()
export class StocksService {
  create(createStocksDto: CreateStocksDto) {
    return 'This action adds a new stocks';
  }

  findAll() {
    return `This action returns all stockss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stocks`;
  }

  update(id: number, updateStocksDto: UpdateStocksDto) {
    return `This action updates a #${id} stocks`;
  }

  remove(id: number) {
    return `This action removes a #${id} stocks`;
  }
}
