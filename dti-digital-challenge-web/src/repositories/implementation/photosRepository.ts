import { IApiSuccessResponse, api } from "../../services/api";
import { CreatePhotoDTO, PhotoDTO, UpdatePhotoDTO } from "../dtos/photosDTO";
import { PhotosRepository } from "../interfaces/photosRepository";

export class PhotosRepositoryImplementation implements PhotosRepository {
  async listPhotosByAlbum(albumId: number): Promise<PhotoDTO[]> {
    const response = await api.get<IApiSuccessResponse<PhotoDTO[]>>(
      `/photos/list-by-album/${albumId}`
    );
    return response.data.RES;
  }

  async listPublicPhotos(): Promise<PhotoDTO[]> {
    const response = await api.get<IApiSuccessResponse<PhotoDTO[]>>(
      "/photos/list-publics"
    );
    return response.data.RES;
  }

  async createPhoto(data: CreatePhotoDTO): Promise<PhotoDTO> {
    const response = await api.post<IApiSuccessResponse<PhotoDTO>>(
      "/photos/create",
      data
    );
    return response.data.RES;
  }

  async deletePhoto(photoId: number): Promise<void> {
    await api.delete(`/photos/delete/${photoId}`);
  }

  async updatePhoto(data: UpdatePhotoDTO): Promise<PhotoDTO> {
    const response = await api.put<IApiSuccessResponse<PhotoDTO>>(
      "/photos/update",
      data
    );
    return response.data.RES;
  }
}
