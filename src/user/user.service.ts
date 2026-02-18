import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async createUser() {
    return "user is registered from user module"
  }
}
