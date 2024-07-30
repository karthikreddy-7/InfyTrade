import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { holdingsService } from './holdings.service';
import { CreateholdingsDto } from './dto/holdings.create.dto';
import { UpdateholdingsDto } from './dto/holdings.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseholdingsDto } from './dto/holdings.response.dto';

@ApiTags('holdings')
@Controller('holdings')
export class holdingsController {
  constructor(private readonly holdingsService: holdingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a holdings' })
  @ApiBody({ type: CreateholdingsDto })
  @ApiResponse({ status: 201, description: 'The holdings has been successfully created.', type: ResponseholdingsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createholdingsDto: CreateholdingsDto) {
    return this.holdingsService.addHolding(createholdingsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all holdingss' })
  @ApiResponse({ status: 200, description: 'Returns all holdingss.', type: [ResponseholdingsDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.holdingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a holdings by UserID' })
  @ApiParam({ name: 'id', description: 'UserID of the holdings' })
  @ApiResponse({ status: 200, description: 'Returns the holdings by UserID.', type: [ResponseholdingsDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.holdingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a holdings by ID' })
  @ApiParam({ name: 'id', description: 'ID of the holdings' })
  @ApiBody({ type: UpdateholdingsDto })
  @ApiResponse({ status: 200, description: 'The holdings has been successfully updated.', type: ResponseholdingsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateholdingsDto: UpdateholdingsDto) {
    return this.holdingsService.update(id, updateholdingsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a holdings by ID' })
  @ApiParam({ name: 'id', description: 'ID of the holdings' })
  @ApiResponse({ status: 200, description: 'The holdings has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.holdingsService.remove(id);
  }
}
