import { PartialType } from '@nestjs/mapped-types';
import { CreateMLmodelsDto } from './mlmodels.create.dto';

export class UpdateMLmodelsDto extends PartialType(CreateMLmodelsDto) {}
