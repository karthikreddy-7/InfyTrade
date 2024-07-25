import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityDto } from './community.create.dto';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {}
