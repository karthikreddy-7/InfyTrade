import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatethreadsDto } from './dto/threads.create.dto';
import { UpdatethreadsDto } from './dto/threads.update.dto';
import { ResponsethreadsDto } from './dto/threads.response.dto';
import { Threads } from './entity/threads.entity';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Threads)
    private readonly threadsRepository: Repository<Threads>,
  ) {}

  async create(createthreadsDto: CreatethreadsDto): Promise<ResponsethreadsDto> {
    const { post, user, ...rest } = createthreadsDto;
  
    const thread = this.threadsRepository.create({
      ...rest,
      post: { id: post }, // setting post using its ID
      user: user ? { id: user } : undefined, // setting user using its ID if it exists
    });
  
    await this.threadsRepository.save(thread);
    return this.toResponseDto(thread);
  }
  
  async findAll(): Promise<ResponsethreadsDto[]> {
    const threads = await this.threadsRepository.find();
    return threads.map(thread => this.toResponseDto(thread));
  }

  async findOne(id: string): Promise<ResponsethreadsDto> {
    const thread = await this.threadsRepository.findOne({ where: { id } });
    if (!thread) {
      throw new Error(`Thread with ID ${id} not found`);
    }
    return this.toResponseDto(thread);
  }

  async update(id: string, updatethreadsDto: UpdatethreadsDto): Promise<ResponsethreadsDto> {
    // Find the existing thread by its ID
    const thread = await this.threadsRepository.findOne({
      where: { id },
      relations: ['post', 'user'], // Ensure relations are included if you need to update them
    });
  
    // Check if the thread exists
    if (!thread) {
      throw new Error(`Thread with ID ${id} not found`);
    }
  
    // Update the thread with new values
    // You can use Object.assign to update only the fields present in updatethreadsDto
    Object.assign(thread, updatethreadsDto);
  
    // Save the updated thread
    await this.threadsRepository.save(thread);
  
    // Return the updated thread as a response DTO
    return this.toResponseDto(thread);
  }
  
  async remove(id: string): Promise<void> {
    const result = await this.threadsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Thread with ID ${id} not found`);
    }
  }

  private toResponseDto(thread: Threads): ResponsethreadsDto {
    const { id, content, post, user } = thread;
    return { id, content, post, user };
  }
}
