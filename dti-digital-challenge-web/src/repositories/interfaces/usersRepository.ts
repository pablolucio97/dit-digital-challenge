import { UserDTO } from "../dtos/usersDTO";

export interface UsersRepository {
  listUsers(): Promise<UserDTO[]>;
  getUser(id: number): Promise<UserDTO | null>;
}
