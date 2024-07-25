import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { CreateWidgetsDto } from './dto/widgets.create.dto';
import { UpdateWidgetsDto } from './dto/widgets.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseWidgetsDto } from './dto/widgets.response.dto';

@ApiTags('Widgets')
@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a widgets' })
  @ApiBody({ type: CreateWidgetsDto })
  @ApiResponse({ status: 201, description: 'The widgets has been successfully created.', type: ResponseWidgetsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createWidgetsDto: CreateWidgetsDto) {
    return this.widgetsService.create(createWidgetsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all widgetss' })
  @ApiResponse({ status: 200, description: 'Returns all widgetss.', type: [ResponseWidgetsDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.widgetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a widgets by ID' })
  @ApiParam({ name: 'id', description: 'ID of the widgets' })
  @ApiResponse({ status: 200, description: 'Returns the widgets by ID.', type: ResponseWidgetsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.widgetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a widgets by ID' })
  @ApiParam({ name: 'id', description: 'ID of the widgets' })
  @ApiBody({ type: UpdateWidgetsDto })
  @ApiResponse({ status: 200, description: 'The widgets has been successfully updated.', type: ResponseWidgetsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateWidgetsDto: UpdateWidgetsDto) {
    return this.widgetsService.update(+id, updateWidgetsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a widgets by ID' })
  @ApiParam({ name: 'id', description: 'ID of the widgets' })
  @ApiResponse({ status: 200, description: 'The widgets has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.widgetsService.remove(+id);
  }
}
