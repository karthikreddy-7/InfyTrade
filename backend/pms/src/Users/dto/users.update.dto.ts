import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './users.create.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
