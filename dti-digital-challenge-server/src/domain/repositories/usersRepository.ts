import { UserDTO } from '../DTOs/usersDTO';

export interface UsersRepository {
  listUsers(): Promise<UserDTO[]>;
}
