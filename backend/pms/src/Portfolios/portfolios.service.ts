import { Injectable } from '@nestjs/common';
import { CreatePortfoliosDto } from './dto/portfolios.create.dto';
import { UpdatePortfoliosDto } from './dto/portfolios.update.dto';

@Injectable()
export class PortfoliosService {
  create(createPortfoliosDto: CreatePortfoliosDto) {
    return 'This action adds a new portfolios';
  }

  findAll() {
    return `This action returns all portfolioss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolios`;
  }

  update(id: number, updatePortfoliosDto: UpdatePortfoliosDto) {
    return `This action updates a #${id} portfolios`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolios`;
  }
}
