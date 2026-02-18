import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser-auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.prisma.user.create({
        data:
        {
          email: registerUserDto.email,
          fname: registerUserDto.fname,
          lname: registerUserDto.lname,
          password: registerUserDto.password
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}
