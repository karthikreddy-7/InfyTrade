import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResponseCommunityDto {
    // Define properties here
    @ApiProperty({
      description: 'Unique identifier for the community post',
      example: 'abc123',
    })
    @IsString()
    id: string;
  
    @ApiProperty({
      description: 'Content of the community post',
      example: 'This is a community post content',
    })
    @IsString()
    content: string;
  
    @ApiProperty({
      description: 'ID of the user who created the post',
      example: '123',
    })
    @IsString()
    userId: string;
  
    @ApiProperty({
      description: 'Date and time when the post was created',
      example: '2024-07-26T12:34:56Z',
    })
    @IsString()
    createdAt: string;
  
    @ApiProperty({
      description: 'Date and time when the post was last updated',
      example: '2024-07-26T12:34:56Z',
    })
    @IsString()
    updatedAt: string;
  }
  