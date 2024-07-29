import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreatethreadsDto } from './dto/threads.create.dto';
import { UpdatethreadsDto } from './dto/threads.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponsethreadsDto } from './dto/threads.response.dto';

@ApiTags('threads')
@Controller('threads')
export class threadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a threads' })
  @ApiBody({ type: CreatethreadsDto })
  @ApiResponse({ status: 201, description: 'The threads has been successfully created.', type: ResponsethreadsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createthreadsDto: CreatethreadsDto) {
    return this.threadsService.create(createthreadsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all threadss' })
  @ApiResponse({ status: 200, description: 'Returns all threadss.', type: [ResponsethreadsDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a threads by ID' })
  @ApiParam({ name: 'id', description: 'ID of the threads' })
  @ApiResponse({ status: 200, description: 'Returns the threads by ID.', type: ResponsethreadsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a threads by ID' })
  @ApiParam({ name: 'id', description: 'ID of the threads' })
  @ApiBody({ type: UpdatethreadsDto })
  @ApiResponse({ status: 200, description: 'The threads has been successfully updated.', type: ResponsethreadsDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updatethreadsDto: UpdatethreadsDto) {
    return this.threadsService.update(id, updatethreadsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a threads by ID' })
  @ApiParam({ name: 'id', description: 'ID of the threads' })
  @ApiResponse({ status: 200, description: 'The threads has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.threadsService.remove(id);
  }
}
