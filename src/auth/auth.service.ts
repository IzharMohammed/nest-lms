import { Injectable, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser-auth.dto';
import bcrypt from "bcrypt";
@Injectable()
export class AuthService {

  constructor(private usersService: UserService) { }

  @Post('register')
  async registerUser(registerUserDto: RegisterDto) {
    console.log("registerUserDto", registerUserDto);
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    /**
     *  validate email and password
     *  check if user exist
     *  if user not exist then add email and hashed password db
     * 
     */
    return await this.usersService.createUser({
      ...registerUserDto,
      password: hash
    })
  }
}
