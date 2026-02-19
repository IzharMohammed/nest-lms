import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/registerUser-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async register(@Body() registerUserDto: RegisterDto) {
    const user = await this.authService.registerUser(registerUserDto);
    return user;
  }

  async login(@Body() loginUserDto: LoginDto) {
    const token = this.authService.loginUser(loginUserDto);
    return token
  }
}
