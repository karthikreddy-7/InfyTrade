import { Injectable } from '@nestjs/common';
import { CreateDashboardsDto } from './dto/dashboards.create.dto';
import { UpdateDashboardsDto } from './dto/dashboards.update.dto';

@Injectable()
export class DashboardsService {
  create(createDashboardsDto: CreateDashboardsDto) {
    return 'This action adds a new dashboards';
  }

  findAll() {
    return `This action returns all dashboardss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboards`;
  }

  update(id: number, updateDashboardsDto: UpdateDashboardsDto) {
    return `This action updates a #${id} dashboards`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboards`;
  }
}
