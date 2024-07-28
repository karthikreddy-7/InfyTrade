import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/users.create.dto';
import { UpdateUsersDto } from './dto/users.update.dto';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const Users = this.userRepository.create(createUsersDto);
    return await this.userRepository.save(Users);
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<Users> {
    const Users = await this.userRepository.findOne({ where: { id } });
    if (!Users) {
      throw new NotFoundException(`Users with ID ${id} not found`);
    }
    return Users;
  }

  async update(id: string, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const Users = await this.userRepository.preload({
      id: id,
      ...updateUsersDto,
    });
    if (!Users) {
      throw new NotFoundException(`Users with ID ${id} not found`);
    }
    return await this.userRepository.save(Users);
  }

  async remove(id: string): Promise<void> {
    const Users = await this.findOne(id);
    await this.userRepository.remove(Users);
  }

  async checkUser(email: string, password: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email, password } });
    return user;
  }
}
