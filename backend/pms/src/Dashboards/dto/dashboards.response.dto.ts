import { ApiProperty } from '@nestjs/swagger';

export class ResponseDashboardsDto {
  @ApiProperty({ description: 'ID of the dashboard' })
  id: number;

  @ApiProperty({ description: 'Name of the dashboard' })
  name: string;

  @ApiProperty({ description: 'ID of the user who owns the dashboard' })
  userId: string;

  @ApiProperty({ description: 'Date when the dashboard was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the dashboard was last updated' })
  updatedAt: Date;
}
