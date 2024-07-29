import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatethreadsDto {
  @ApiProperty({
    description: 'The content of the thread',
    example: 'This is a comment on the post.',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The ID of the post this thread belongs to',
    example: '1',  
  })
  @IsNotEmpty()
  @IsString()
  post: string;

  @ApiPropertyOptional({
    description: 'The ID of the user who created the thread',
    example: '1', 
  })
  @IsOptional()
  @IsString()
  user?: string;
}
