import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfoliosDto } from './dto/portfolios.create.dto';
import { UpdatePortfoliosDto } from './dto/portfolios.update.dto';
import { Portfolio, TransactionType } from './entity/portfolios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { holdingsService,  } from 'src/holdings/holdings.service';
@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private readonly holdingsService: holdingsService
  ) {}

  async create(createPortfoliosDto: CreatePortfoliosDto): Promise<Portfolio> {
    const { userId, stock, quantity, price, type,transactionDate } = createPortfoliosDto;

    if (type !== 'BUY' && type !== 'SELL') {
      throw new BadRequestException('Invalid transaction type');
    }

    const portfolio = this.portfolioRepository.create({
      userId,
      stock,
      quantity,
      price,
      type,
      transactionDate
    });

    await this.portfolioRepository.save(portfolio);
    await this.updateHoldings(createPortfoliosDto);

    return portfolio;
  }

  private async updateHoldings(createPortfoliosDto: CreatePortfoliosDto): Promise<void> {
    const { userId, stock, quantity, price, type } = createPortfoliosDto;
    if (type === TransactionType.BUY) {
      await this.holdingsService.addHolding({
        userId,
        stock,
        quantity,
        price,
      });
    } else if (type === 'SELL') {
      await this.holdingsService.removeHolding(userId, stock, quantity,price);
    }
  }

  async findAll(): Promise<Portfolio[]> {
    return this.portfolioRepository.find();
  }

  async findOne(id: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }
    return portfolio;
  }

  async update(id: string, updateData: UpdatePortfoliosDto): Promise<Portfolio> {
    await this.portfolioRepository.update(id, updateData);
    const updatedPortfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!updatedPortfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }
    return updatedPortfolio;
  }

  async remove(id: string): Promise<void> {
    const result = await this.portfolioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }
  }
}