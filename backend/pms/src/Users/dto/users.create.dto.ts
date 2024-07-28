import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The user name of the user',
    example: 'John7',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'Password123!',
  })
  @IsString()
  password: string;
}
