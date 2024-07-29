import { PartialType } from '@nestjs/mapped-types';
import { CreateholdingsDto } from './holdings.create.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateholdingsDto {
    @ApiProperty()
    quantity?: number;
  
    @ApiProperty()
    averagePrice?: number;
  }
