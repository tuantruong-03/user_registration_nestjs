// src/user/dto/login-user-request.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserRequest {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
