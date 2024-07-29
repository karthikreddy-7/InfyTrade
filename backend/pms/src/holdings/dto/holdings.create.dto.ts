import { ApiProperty } from "@nestjs/swagger";

export class CreateholdingsDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  stock: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;
}

