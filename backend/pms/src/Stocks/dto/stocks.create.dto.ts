import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateStocksDto {
  @ApiProperty
  ({
    description: 'The stock symbol (e.g., "IBM", "TSLA")',
    example: 'IBM',
  })
  @IsString()
  readonly symbol: string;

  @ApiProperty({
    description: 'The full name of the company',
    example: 'International Business Machines Corporation',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The current stock price',
    example: 143.22,
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'The number of shares traded',
    example: 1000000,
  })
  @IsNumber()
  readonly volume: number;

  @ApiProperty({
    description: 'The price change',
    example: -1.45,
  })
  @IsNumber()
  readonly change: number;

  @ApiProperty({
    description: 'The percentage price change',
    example: -0.01,
  })
  @IsNumber()
  readonly percentage_change: number;
  }
  