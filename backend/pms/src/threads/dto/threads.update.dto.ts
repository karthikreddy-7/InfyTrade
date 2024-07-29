import { PartialType } from '@nestjs/mapped-types';
import { CreatethreadsDto } from './threads.create.dto';

export class UpdatethreadsDto extends PartialType(CreatethreadsDto) {}
