import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserDTO } from '../DTOs/usersDTO';
import { UsersRepository } from '../repositories/usersRepository';

@Injectable()
export class UsersService implements UsersRepository {
  async listUsers(): Promise<UserDTO[]> {
    try {
      const { data } = await axios.get<UserDTO[]>(
        'https://jsonplaceholder.typicode.com/users',
      );
      if (data) {
        return data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}
