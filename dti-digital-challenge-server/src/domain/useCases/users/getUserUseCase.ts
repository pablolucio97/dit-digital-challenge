import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';

@Injectable()
export class GetUserUseCase {
  constructor(private usersService: UsersService) {}
  async execute(id: number) {
    const user = await this.usersService.getUser(id);
    return user;
  }
}
