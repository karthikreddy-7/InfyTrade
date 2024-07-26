import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommunityDto {
    // Define properties here
    @ApiProperty({
      description: 'Content of the community post',
      example: 'This is a community post content',
    })
    @IsNotEmpty()
    @IsString()
    content: string;
  
    @ApiProperty({
      description: 'ID of the user creating the post (optional)',
      example: '123',
      required: false,
    })
    @IsOptional()
    @IsString()
    userId?: string;
  }
  