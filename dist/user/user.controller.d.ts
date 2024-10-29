import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { LoginUserRequest } from './dto/login-user-request.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserRequest: CreateUserRequest): Promise<string>;
    login(loginUserRequest: LoginUserRequest): Promise<{
        accessToken: string;
    }>;
}
