import { Injectable } from '@nestjs/common';
import { CreateMLmodelsDto } from './dto/mlmodels.create.dto';
import { UpdateMLmodelsDto } from './dto/mlmodels.update.dto';

@Injectable()
export class MLmodelsService {
  create(createMLmodelsDto: CreateMLmodelsDto) {
    return 'This action adds a new mlmodels';
  }

  findAll() {
    return `This action returns all mlmodelss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mlmodels`;
  }

  update(id: number, updateMLmodelsDto: UpdateMLmodelsDto) {
    return `This action updates a #${id} mlmodels`;
  }

  remove(id: number) {
    return `This action removes a #${id} mlmodels`;
  }
}
