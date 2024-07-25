import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { MLmodelsService } from './mlmodels.service';
import { CreateMLmodelsDto } from './dto/mlmodels.create.dto';
import { UpdateMLmodelsDto } from './dto/mlmodels.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseMLmodelsDto } from './dto/mlmodels.response.dto';

@ApiTags('MLmodels')
@Controller('mlmodels')
export class MLmodelsController {
  constructor(private readonly mlmodelsService: MLmodelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a mlmodels' })
  @ApiBody({ type: CreateMLmodelsDto })
  @ApiResponse({ status: 201, description: 'The mlmodels has been successfully created.', type: ResponseMLmodelsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createMLmodelsDto: CreateMLmodelsDto) {
    return this.mlmodelsService.create(createMLmodelsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all mlmodelss' })
  @ApiResponse({ status: 200, description: 'Returns all mlmodelss.', type: [ResponseMLmodelsDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.mlmodelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a mlmodels by ID' })
  @ApiParam({ name: 'id', description: 'ID of the mlmodels' })
  @ApiResponse({ status: 200, description: 'Returns the mlmodels by ID.', type: ResponseMLmodelsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.mlmodelsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a mlmodels by ID' })
  @ApiParam({ name: 'id', description: 'ID of the mlmodels' })
  @ApiBody({ type: UpdateMLmodelsDto })
  @ApiResponse({ status: 200, description: 'The mlmodels has been successfully updated.', type: ResponseMLmodelsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateMLmodelsDto: UpdateMLmodelsDto) {
    return this.mlmodelsService.update(+id, updateMLmodelsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a mlmodels by ID' })
  @ApiParam({ name: 'id', description: 'ID of the mlmodels' })
  @ApiResponse({ status: 200, description: 'The mlmodels has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.mlmodelsService.remove(+id);
  }
}
