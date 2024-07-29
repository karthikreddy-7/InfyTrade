import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStocksDto } from './dto/stocks.create.dto';
import { UpdateStocksDto } from './dto/stocks.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entity/stocks.entity';
import { Repository } from 'typeorm';
@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  create(createStockDto: CreateStocksDto): Promise<Stock> {
    const stock = this.stockRepository.create(createStockDto);
    return this.stockRepository.save(stock);
  }

  findAll(): Promise<Stock[]> {
    return this.stockRepository.find();
  }

  findOne(id: string): Promise<Stock> {
    return this.stockRepository.findOneBy({ id });
  }

  async update(id: string, updateStockDto: UpdateStocksDto): Promise<Stock> {
    await this.stockRepository.update(id, updateStockDto);
    return this.stockRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.stockRepository.delete(id);
  }

  async searchByName(name: string) {
    const stock = await this.stockRepository.find({ where: { name : name } });
    console.log(stock);
    if (!stock) {
      throw new NotFoundException(`Stock with name ${name} not found`);
    }
    return stock;
  }
}