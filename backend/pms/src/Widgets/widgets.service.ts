import { Injectable } from '@nestjs/common';
import { CreateWidgetsDto } from './dto/widgets.create.dto';
import { UpdateWidgetsDto } from './dto/widgets.update.dto';

@Injectable()
export class WidgetsService {
  create(createWidgetsDto: CreateWidgetsDto) {
    return 'This action adds a new widgets';
  }

  findAll() {
    return `This action returns all widgetss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} widgets`;
  }

  update(id: number, updateWidgetsDto: UpdateWidgetsDto) {
    return `This action updates a #${id} widgets`;
  }

  remove(id: number) {
    return `This action removes a #${id} widgets`;
  }
}
