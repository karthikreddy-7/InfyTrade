import { PartialType } from '@nestjs/mapped-types';
import { CreateWidgetsDto } from './widgets.create.dto';

export class UpdateWidgetsDto extends PartialType(CreateWidgetsDto) {}
