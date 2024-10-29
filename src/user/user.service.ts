import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserRequest } from './dto/create-user-request.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserRequest } from './dto/login-user-request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}
  async register(createUserRequest: CreateUserRequest): Promise<string> {
    const {email, password } = createUserRequest;

    // Check if username or email already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password,10);

    // Create and save the new user
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return 'User registered successfully';
  }
  async login(loginUserRequest: LoginUserRequest): Promise<{ accessToken: string }> {
    const { email, password } = loginUserRequest;

    // Check if the user exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create and return a JWT token
    const payload = { email: user.email, sub: user._id }; // Include user information in the payload
    const accessToken = await this.jwtService.signAsync(payload); // Sign the token

    return { accessToken }; // Return the access token
  }
    
}
