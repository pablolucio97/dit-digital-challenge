import { UserDTO } from "../dtos/usersDTO";

export interface UsersRepository {
  listUsers(): Promise<UserDTO[]>;
}
