import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new ConflictException('Passwords do not match');
    }
    const existing = await this.userModel.findOne({ username: dto.username });
    if (existing) throw new ConflictException('Username already exists');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({ username: dto.username, password: hashed });
    return { username: user.username };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ username: dto.username });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ sub: user._id, username: user.username });
    return { access_token: token };
  }
}