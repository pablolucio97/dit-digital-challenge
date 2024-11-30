import { IApiSuccessResponse, api } from "../../services/api";
import { UserDTO } from "../dtos/usersDTO";
import { UsersRepository } from "../interfaces/usersRepository";

export class UsersRepositoryImplementation implements UsersRepository {
  async listUsers(): Promise<UserDTO[]> {
    const response = await api.get<IApiSuccessResponse<UserDTO[]>>(
      "/users/list"
    );
    return response.data.RES;
  }
  async getUser(id: number): Promise<UserDTO> {
    const response = await api.get<IApiSuccessResponse<UserDTO>>(
      `users/get/${id}`
    );
    return response.data.RES;
  }
}
