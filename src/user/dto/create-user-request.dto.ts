// create-user-request.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserRequest {

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}