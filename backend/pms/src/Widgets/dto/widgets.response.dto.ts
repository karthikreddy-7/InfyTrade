import { ApiProperty } from '@nestjs/swagger';

export class ResponseWidgetsDto {
  @ApiProperty({
    description: 'The unique identifier of the widget',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the associated dashboard',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  dashboardId: string;

  @ApiProperty({
    description: 'The type of chart to be displayed',
    example: 'line',
  })
  chartType: string;

  @ApiProperty({
    description: 'The stock symbol associated with the widget',
    example: 'AAPL',
  })
  stockSymbol: string;

  @ApiProperty({
    description: 'Configuration details for the widget',
    example: { color: 'blue', showLegend: true },
    type: Object,
  })
  config: object;

  @ApiProperty({
    description: 'Date when the widget was created',
    example: '2024-08-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the widget was last updated',
    example: '2024-08-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
