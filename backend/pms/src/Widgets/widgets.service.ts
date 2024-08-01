import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWidgetsDto } from './dto/widgets.create.dto';
import { UpdateWidgetsDto } from './dto/widgets.update.dto';
import { Widget } from './entity/widgets.entity';

@Injectable()
export class WidgetsService {
  constructor(
    @InjectRepository(Widget)
    private readonly widgetsRepository: Repository<Widget>,
  ) {}

  async create(createWidgetsDto: CreateWidgetsDto): Promise<Widget> {
    const widget = this.widgetsRepository.create(createWidgetsDto);
    return await this.widgetsRepository.save(widget);
  }

  async findAll(): Promise<Widget[]> {
    return await this.widgetsRepository.find();
  }

  async findOne(id: string): Promise<Widget> {
    const widget = await this.widgetsRepository.findOne({ where: { id } });
    if (!widget) {
      throw new NotFoundException(`Widget with ID ${id} not found`);
    }
    return widget;
  }

  async update(id: string, updateWidgetsDto: UpdateWidgetsDto): Promise<Widget> {
    const widget = await this.widgetsRepository.preload({
      id: id,
      ...updateWidgetsDto,
    });
    if (!widget) {
      throw new NotFoundException(`Widget with ID ${id} not found`);
    }
    return await this.widgetsRepository.save(widget);
  }

  async remove(id: string): Promise<void> {
    const widget = await this.findOne(id);
    await this.widgetsRepository.remove(widget);
  }
}
