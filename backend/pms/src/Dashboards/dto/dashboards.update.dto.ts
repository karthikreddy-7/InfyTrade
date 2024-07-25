import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardsDto } from './dashboards.create.dto';

export class UpdateDashboardsDto extends PartialType(CreateDashboardsDto) {}
