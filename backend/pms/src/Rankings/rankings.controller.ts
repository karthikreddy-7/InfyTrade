import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { CreateRankingsDto } from './dto/rankings.create.dto';
import { UpdateRankingsDto } from './dto/rankings.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseRankingsDto } from './dto/rankings.response.dto';

@ApiTags('Rankings')
@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a rankings' })
  @ApiBody({ type: CreateRankingsDto })
  @ApiResponse({ status: 201, description: 'The rankings has been successfully created.', type: ResponseRankingsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createRankingsDto: CreateRankingsDto) {
    return this.rankingsService.create(createRankingsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rankingss' })
  @ApiResponse({ status: 200, description: 'Returns all rankingss.', type: [ResponseRankingsDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.rankingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rankings by ID' })
  @ApiParam({ name: 'id', description: 'ID of the rankings' })
  @ApiResponse({ status: 200, description: 'Returns the rankings by ID.', type: ResponseRankingsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.rankingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rankings by ID' })
  @ApiParam({ name: 'id', description: 'ID of the rankings' })
  @ApiBody({ type: UpdateRankingsDto })
  @ApiResponse({ status: 200, description: 'The rankings has been successfully updated.', type: ResponseRankingsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateRankingsDto: UpdateRankingsDto) {
    return this.rankingsService.update(+id, updateRankingsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rankings by ID' })
  @ApiParam({ name: 'id', description: 'ID of the rankings' })
  @ApiResponse({ status: 200, description: 'The rankings has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.rankingsService.remove(+id);
  }
}
