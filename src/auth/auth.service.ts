import { Injectable, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/registerUser-auth.dto';
import bcrypt from "bcrypt";
@Injectable()
export class AuthService {

  constructor(private usersService: UserService) { }

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

  async loginUser(loginUserDto: LoginDto) {
    console.log(loginUserDto);

    return "logged in successfully"
  }
}
