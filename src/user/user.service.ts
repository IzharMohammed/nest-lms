import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser-auth.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(registerUserDto: RegisterDto): Promise<User> {
    try {
      return await this.userModel.create(
        {
          email: registerUserDto.email,
          fname: registerUserDto.fname,
          lname: registerUserDto.lname,
          password: registerUserDto.password
        })

    } catch (err) {
      const e = err;

      const DUPLICATE_KEY_CODE = 11000;
      if (e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email is already taken.');
      }

      throw err;
    }
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }
}
