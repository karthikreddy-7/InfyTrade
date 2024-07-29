import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "../entity/portfolios.entity";

export class ResponsePortfoliosDto {
  @ApiProperty({ example: 'portfolio-uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 'AAPL' })
  stock: string;

  @ApiProperty({ example: 'BUY' })
  type: TransactionType;

  @ApiProperty({ example: 10.5 })
  quantity: number;

  @ApiProperty({ example: 150.75 })
  price: number;

  @ApiProperty({ example: '2024-07-29T12:34:56Z' })
  transactionDate: Date;
}