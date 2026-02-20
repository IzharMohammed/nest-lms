import { Injectable, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/registerUser-auth.dto';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async registerUser(registerUserDto: RegisterDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    /**
     *  validate email and password
     *  check if user exist
     *  if user not exist then add email and hashed password db
     * 
     */
    const user = await this.usersService.createUser({
      ...registerUserDto,
      password: hash
    })

    return user;
  }

  async loginUser(loginUserDto: LoginDto): Promise<{ access_token: string }> {
    /**
     * 1. v- email and password must be passed
     * 2.  user should be present already and password should match the db password
     * 3. create jwt with userId + role
     * 4. return jwt
     */
    const user = await this.usersService.findOne(loginUserDto.email);

    if (!user) {
      throw new NotFoundException('Not a registered email');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      roles: user.role
    };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
