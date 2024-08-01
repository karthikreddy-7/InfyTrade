import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { CreateDashboardsDto } from './dto/dashboards.create.dto';
import { UpdateDashboardsDto } from './dto/dashboards.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseDashboardsDto } from './dto/dashboards.response.dto';

@ApiTags('Dashboards')
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a dashboards' })
  @ApiBody({ type: CreateDashboardsDto })
  @ApiResponse({ status: 201, description: 'The dashboards has been successfully created.', type: ResponseDashboardsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createDashboardsDto: CreateDashboardsDto) {
    return this.dashboardsService.create(createDashboardsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dashboardss' })
  @ApiResponse({ status: 200, description: 'Returns all dashboardss.', type: [ResponseDashboardsDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.dashboardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dashboards by UserID' })
  @ApiParam({ name: 'id', description: 'UserID of the dashboards' })
  @ApiResponse({ status: 200, description: 'Returns the dashboards by UserID.', type: ResponseDashboardsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.dashboardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dashboards by ID' })
  @ApiParam({ name: 'id', description: 'ID of the dashboards' })
  @ApiBody({ type: UpdateDashboardsDto })
  @ApiResponse({ status: 200, description: 'The dashboards has been successfully updated.', type: ResponseDashboardsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateDashboardsDto: UpdateDashboardsDto) {
    return this.dashboardsService.update(id, updateDashboardsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dashboards by ID' })
  @ApiParam({ name: 'id', description: 'ID of the dashboards' })
  @ApiResponse({ status: 200, description: 'The dashboards has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.dashboardsService.remove(id);
  }
}
