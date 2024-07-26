import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommunityDto } from './dto/community.create.dto';
import { UpdateCommunityDto } from './dto/community.update.dto';
import { CommunityPost } from './entity/community.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityPost)
    private readonly communityRepository: Repository<CommunityPost>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto): Promise<CommunityPost> {
    const community = this.communityRepository.create(createCommunityDto);
    return await this.communityRepository.save(community);
  }

  async findAll(): Promise<CommunityPost[]> {
    return await this.communityRepository.find();
  }

  async findOne(id: string): Promise<CommunityPost> {
    const community = await this.communityRepository.findOne({ where: { id } });
    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }
    return community;
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto): Promise<CommunityPost> {
    const community = await this.communityRepository.preload({
      id: id,
      ...updateCommunityDto,
    });
    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }
    return await this.communityRepository.save(community);
  }

  async remove(id: string): Promise<void> {
    const community = await this.findOne(id);
    await this.communityRepository.remove(community);
  }
}
