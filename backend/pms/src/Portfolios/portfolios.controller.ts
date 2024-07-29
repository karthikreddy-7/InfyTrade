import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfoliosDto } from './dto/portfolios.create.dto';
import { UpdatePortfoliosDto } from './dto/portfolios.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponsePortfoliosDto } from './dto/portfolios.response.dto';

@ApiTags('Portfolios')
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a portfolios' })
  @ApiBody({ type: CreatePortfoliosDto })
  @ApiResponse({ status: 201, description: 'The portfolios has been successfully created.', type: ResponsePortfoliosDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createPortfoliosDto: CreatePortfoliosDto) {
    return this.portfoliosService.create(createPortfoliosDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all portfolioss' })
  @ApiResponse({ status: 200, description: 'Returns all portfolioss.', type: [ResponsePortfoliosDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.portfoliosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a portfolios by UserID' })
  @ApiParam({ name: 'id', description: 'UserID of the portfolios' })
  @ApiResponse({ status: 200, description: 'Returns the portfolios by UserID.', type: ResponsePortfoliosDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.portfoliosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a portfolios by ID' })
  @ApiParam({ name: 'id', description: 'ID of the portfolios' })
  @ApiBody({ type: UpdatePortfoliosDto })
  @ApiResponse({ status: 200, description: 'The portfolios has been successfully updated.', type: ResponsePortfoliosDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updatePortfoliosDto: UpdatePortfoliosDto) {
    return this.portfoliosService.update(id, updatePortfoliosDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a portfolios by ID' })
  @ApiParam({ name: 'id', description: 'ID of the portfolios' })
  @ApiResponse({ status: 200, description: 'The portfolios has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.portfoliosService.remove(id);
  }
}
