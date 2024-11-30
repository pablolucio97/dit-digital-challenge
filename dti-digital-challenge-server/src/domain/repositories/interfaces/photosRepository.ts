import { CreatePhotoDTO, PhotoDTO } from 'src/domain/DTOs/photosDTO';

export interface PhotosRepository {
  createPhoto: (data: CreatePhotoDTO) => Promise<PhotoDTO | null>;
  listPhotosByAlbum: (albumId: number) => Promise<PhotoDTO[] | null>;
  deletePhoto: (photoId: number) => Promise<void>;
}
