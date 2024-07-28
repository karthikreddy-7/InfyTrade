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

  }
  