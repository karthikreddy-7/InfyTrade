import { IsString, IsEmail } from 'class-validator';

export class ResponseUsersDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;
}
