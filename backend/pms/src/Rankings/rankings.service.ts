import { Injectable } from '@nestjs/common';
import { CreateRankingsDto } from './dto/rankings.create.dto';
import { UpdateRankingsDto } from './dto/rankings.update.dto';

@Injectable()
export class RankingsService {
  create(createRankingsDto: CreateRankingsDto) {
    return 'This action adds a new rankings';
  }

  findAll() {
    return `This action returns all rankingss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rankings`;
  }

  update(id: number, updateRankingsDto: UpdateRankingsDto) {
    return `This action updates a #${id} rankings`;
  }

  remove(id: number) {
    return `This action removes a #${id} rankings`;
  }
}
