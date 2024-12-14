import { UserDTO } from '../../DTOs/usersDTO';

export interface UsersRepository {
  listUsers(): Promise<UserDTO[]>;
  getUser(id: number): Promise<UserDTO | null>;
}
