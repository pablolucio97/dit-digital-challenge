import { IApiSuccessResponse, api } from "../../services/api";
import { AlbumDTO, CreateAlbumDTO, UpdateAlbumDTO } from "../dtos/albumsDTO";
import { AlbumsRepository } from "../interfaces/albumsRepository";

export class AlbumsRepositoryImplementation implements AlbumsRepository {
  async listAlbumsByUser(userId: number): Promise<AlbumDTO[]> {
    const response = await api.get<IApiSuccessResponse<AlbumDTO[]>>(
      `/albums/list-by-user/${userId}`
    );
    return response.data.RES;
  }

  async createAlbum(data: CreateAlbumDTO): Promise<AlbumDTO> {
    const response = await api.post<IApiSuccessResponse<AlbumDTO>>(
      "/albums/create",
      data
    );
    return response.data.RES;
  }

  async updateAlbum(data: UpdateAlbumDTO): Promise<AlbumDTO> {
    const response = await api.put<IApiSuccessResponse<AlbumDTO>>(
      "/albums/update",
      data
    );
    return response.data.RES;
  }

  async deleteAlbum(albumId: number): Promise<void> {
    await api.delete(`/albums/delete/${albumId}`);
  }
}
