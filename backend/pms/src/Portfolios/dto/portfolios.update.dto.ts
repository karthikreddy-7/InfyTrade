import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfoliosDto } from './portfolios.create.dto';

export class UpdatePortfoliosDto extends PartialType(CreatePortfoliosDto) {}
