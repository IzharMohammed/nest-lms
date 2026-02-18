import { Injectable, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser-auth.dto';

@Injectable()
export class AuthService {

  constructor(private usersService: UserService) { }

  @Post('register')
  async registerUser(registerUserDto: RegisterDto) {
    console.log("registerUserDto", registerUserDto);

    /**
     *  validate email and password
     *  check if user exist
     *  if user not exist then add email and hashed password db
     * 
     */
    return await this.usersService.createUser()
  }
}
