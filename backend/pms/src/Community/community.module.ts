import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { CommunityPost } from './entity/community.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityPost])],
  controllers: [CommunityController],
  providers: [CommunityService]
})
export class CommunityModule {}
