import { CreatePhotoDTO, PhotoDTO, UpdatePhotoDTO } from "../dtos/photosDTO";

export interface PhotosRepository {
  listPhotosByAlbum(albumId: number): Promise<PhotoDTO[]>;
  listPublicPhotos(): Promise<PhotoDTO[]>;
  createPhoto(data: CreatePhotoDTO): Promise<PhotoDTO>;
  deletePhoto(photoId: number): Promise<void>;
  updatePhoto: (data: UpdatePhotoDTO) => Promise<PhotoDTO>;
}
