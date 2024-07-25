import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/community.create.dto';
import { UpdateCommunityDto } from './dto/community.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseCommunityDto } from './dto/community.response.dto';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a community' })
  @ApiBody({ type: CreateCommunityDto })
  @ApiResponse({ status: 201, description: 'The community has been successfully created.', type: ResponseCommunityDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all communitys' })
  @ApiResponse({ status: 200, description: 'Returns all communitys.', type: [ResponseCommunityDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.communityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a community by ID' })
  @ApiParam({ name: 'id', description: 'ID of the community' })
  @ApiResponse({ status: 200, description: 'Returns the community by ID.', type: ResponseCommunityDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.communityService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a community by ID' })
  @ApiParam({ name: 'id', description: 'ID of the community' })
  @ApiBody({ type: UpdateCommunityDto })
  @ApiResponse({ status: 200, description: 'The community has been successfully updated.', type: ResponseCommunityDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communityService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a community by ID' })
  @ApiParam({ name: 'id', description: 'ID of the community' })
  @ApiResponse({ status: 200, description: 'The community has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.communityService.remove(+id);
  }
}
