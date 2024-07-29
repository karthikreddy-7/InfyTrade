import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CommunityPost } from 'src/Community/entity/community.entity';
import { Users } from 'src/Users/entity/users.entity';

export class ResponsethreadsDto {
  @ApiProperty({
    description: 'The unique identifier of the thread',
    example: '12356181 91861',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The content of the thread',
    example: 'This is a comment on the post.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The ID of the post this thread belongs to',
    example: '5ec57771-6df2-4b94-89fe-9a8adf1fdafa',
  })
  post: CommunityPost;

  @ApiPropertyOptional({
    description: 'The ID of the user who created the thread',
    example: '5ec57771-6df2-4b94-89fe-9a8adf1fdafa',
  })
  @IsOptional()
  user?: string;
}
