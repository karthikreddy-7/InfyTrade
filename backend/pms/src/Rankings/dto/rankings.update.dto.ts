import { PartialType } from '@nestjs/mapped-types';
import { CreateRankingsDto } from './rankings.create.dto';

export class UpdateRankingsDto extends PartialType(CreateRankingsDto) {}
