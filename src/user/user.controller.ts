import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginDto, registerDto, resultDto } from './dto/index.dto';
import { UserService } from './user.service';

@Controller('Auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<resultDto> {
    const user = await this.userService.findOneByEmail(body.email);
    if (user) {
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (isMatch) {
        const payload = { email: user.email, id: user.id, name: user.name };
        const token = await this.jwtService.signAsync(payload);
        response.cookie('token', token);
        return { message: 'success', error: false, user: user, token: token };
      }
    } else {
      return { message: 'error', error: true, user: null, token: null };
    }
  }

  @Post('register')
  async register(@Body() body: registerDto): Promise<resultDto> {
    const encryPassword = await bcrypt.hash(body.password, 10);
    body.password = encryPassword;
    const newUser = await this.userService.create(body);
    if (newUser) {
      const payload = {
        email: newUser.email,
        id: newUser.id,
        name: newUser.name,
      };
      const token = await this.jwtService.signAsync(payload);
      return { message: 'success', error: false, user: newUser, token: token };
    } else {
      return {
        message: 'Unable to register',
        error: true,
        user: null,
        token: null,
      };
    }
  }
}
