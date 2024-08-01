import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDashboardsDto } from './dto/dashboards.create.dto';
import { UpdateDashboardsDto } from './dto/dashboards.update.dto';
import { Dashboard } from './entity/dashboards.entity';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardsRepository: Repository<Dashboard>,
  ) {}

  async create(createDashboardsDto: CreateDashboardsDto): Promise<Dashboard> {
    const dashboard = this.dashboardsRepository.create(createDashboardsDto);
    return await this.dashboardsRepository.save(dashboard);
  }

  async findAll(): Promise<Dashboard[]> {
    return await this.dashboardsRepository.find();
  }

  async findOne(id: string): Promise<Dashboard[]> {
    const dashboard = await this.dashboardsRepository.find({ where: {userId: id } });
    if (!dashboard) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }
    return dashboard;
  }

  async update(id: string, updateDashboardsDto: UpdateDashboardsDto): Promise<Dashboard> {
    const dashboard = await this.dashboardsRepository.preload({
      id: id,
      ...updateDashboardsDto,
    });
    if (!dashboard) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }
    return await this.dashboardsRepository.save(dashboard);
  }

  async remove(id: string): Promise<void> {
    const dashboard = await this.findOne(id);
    await this.dashboardsRepository.remove(dashboard);
  }
}
