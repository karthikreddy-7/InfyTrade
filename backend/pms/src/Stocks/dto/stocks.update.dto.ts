import { PartialType } from '@nestjs/mapped-types';
import { CreateStocksDto } from './stocks.create.dto';

export class UpdateStocksDto extends PartialType(CreateStocksDto) {}
