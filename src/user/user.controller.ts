import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { LoginUserRequest } from './dto/login-user-request.dto';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() createUserRequest: CreateUserRequest) {
    return this.userService.register(createUserRequest);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserRequest: LoginUserRequest) {
    return this.userService.login(loginUserRequest);
  }
}
