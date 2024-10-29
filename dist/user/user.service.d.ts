import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { LoginUserRequest } from './dto/login-user-request.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(createUserRequest: CreateUserRequest): Promise<string>;
    login(loginUserRequest: LoginUserRequest): Promise<{
        accessToken: string;
    }>;
}
