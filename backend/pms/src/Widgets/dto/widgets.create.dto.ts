import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsJSON, IsOptional } from 'class-validator';

export class CreateWidgetsDto {
  @ApiProperty({
    description: 'The ID of the associated dashboard',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  dashboardId: string;

  @ApiProperty({
    description: 'The type of chart to be displayed',
    example: 'line',
  })
  @IsNotEmpty()
  @IsString()
  chartType: string;

  @ApiProperty({
    description: 'The stock symbol associated with the widget',
    example: 'AAPL',
  })
  @IsNotEmpty()
  @IsString()
  stockSymbol: string;

  @ApiProperty({
    description: 'Configuration details for the widget',
    example: { color: 'blue', showLegend: true },
    type: Object,
    required: false,
  })
  @IsOptional()
  @IsJSON()
  config: object;
}
