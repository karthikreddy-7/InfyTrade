import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/users.create.dto';
import { UpdateUsersDto } from './dto/users.update.dto';
import { ApiResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseUsersDto } from './dto/users.response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a users' })
  @ApiBody({ type: CreateUsersDto })
  @ApiResponse({ status: 201, description: 'The users has been successfully created.', type: ResponseUsersDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all userss' })
  @ApiResponse({ status: 200, description: 'Returns all userss.', type: [ResponseUsersDto] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a users by ID' })
  @ApiParam({ name: 'id', description: 'ID of the users' })
  @ApiResponse({ status: 200, description: 'Returns the users by ID.', type: ResponseUsersDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a users by ID' })
  @ApiParam({ name: 'id', description: 'ID of the users' })
  @ApiBody({ type: UpdateUsersDto })
  @ApiResponse({ status: 200, description: 'The users has been successfully updated.', type: ResponseUsersDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(+id, updateUsersDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a users by ID' })
  @ApiParam({ name: 'id', description: 'ID of the users' })
  @ApiResponse({ status: 200, description: 'The users has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
