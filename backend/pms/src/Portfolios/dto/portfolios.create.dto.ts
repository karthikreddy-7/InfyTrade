import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { TransactionType } from "../entity/portfolios.entity";

export class CreatePortfoliosDto {
  @ApiProperty({ example: 'user-uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'AAPL' })
  @IsString()
  stock: string;

  @ApiProperty({ example: 'BUY' })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 150.75 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: '2024-07-29T12:34:56Z' })
  @IsDateString()
  transactionDate: string;
}