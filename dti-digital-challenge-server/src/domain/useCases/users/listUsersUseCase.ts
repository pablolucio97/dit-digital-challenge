import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';

@Injectable()
export class ListUsersUseCase {
  constructor(private usersService: UsersService) {}
  async execute() {
    const users = await this.usersService.listUsers();
    return users;
  }
}
