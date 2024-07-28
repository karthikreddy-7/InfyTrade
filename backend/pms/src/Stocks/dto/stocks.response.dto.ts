// src/stocks/dto/response-stocks.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ResponseStocksDto {
  @ApiProperty({
    description: 'The unique identifier of the stock',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The stock symbol (e.g., "IBM", "TSLA")',
    example: 'IBM',
  })
  symbol: string;

  @ApiProperty({
    description: 'The full name of the company',
    example: 'International Business Machines Corporation',
  })
  name: string;

  @ApiProperty({
    description: 'The current stock price',
    example: 143.22,
  })
  price: number;
}
