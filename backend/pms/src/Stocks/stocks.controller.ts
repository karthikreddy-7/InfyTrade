import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStocksDto, SearchStocksDto } from './dto/stocks.create.dto';
import { UpdateStocksDto } from './dto/stocks.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ResponseStocksDto } from './dto/stocks.response.dto';

@ApiTags('Stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a stocks' })
  @ApiBody({ type: CreateStocksDto })
  @ApiResponse({ status: 201, description: 'The stocks has been successfully created.', type: ResponseStocksDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createStocksDto: CreateStocksDto) {
    return this.stocksService.create(createStocksDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stocks' })
  @ApiResponse({ status: 200, description: 'Returns all stocks.', type: [ResponseStocksDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.stocksService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for a stock by name' })
  @ApiQuery({ name: 'name', description: 'Name of the stock to search for' })
  @ApiResponse({ status: 200, description: 'Returns the stock matching the name.', type: ResponseStocksDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  search(@Query() searchStocksDto: SearchStocksDto) {
    return this.stocksService.searchByName(searchStocksDto.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stock by ID' })
  @ApiParam({ name: 'id', description: 'ID of the stock' })
  @ApiResponse({ status: 200, description: 'Returns the stock by ID.', type: ResponseStocksDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a stocks by ID' })
  @ApiParam({ name: 'id', description: 'ID of the stocks' })
  @ApiBody({ type: UpdateStocksDto })
  @ApiResponse({ status: 200, description: 'The stocks has been successfully updated.', type: ResponseStocksDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateStocksDto: UpdateStocksDto) {
    return this.stocksService.update(id, updateStocksDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stocks by ID' })
  @ApiParam({ name: 'id', description: 'ID of the stocks' })
  @ApiResponse({ status: 200, description: 'The stocks has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.stocksService.remove(id);
  }
}
