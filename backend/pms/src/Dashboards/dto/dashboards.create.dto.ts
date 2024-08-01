import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDashboardsDto {
  @ApiProperty({ description: 'Name of the dashboard' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID of the user who owns the dashboard' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
