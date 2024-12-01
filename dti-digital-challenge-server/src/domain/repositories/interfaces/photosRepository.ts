import {
  CreatePhotoDTO,
  PhotoDTO,
  UpdatePhotoDTO,
} from 'src/domain/DTOs/photosDTO';

export interface PhotosRepository {
  createPhoto: (data: CreatePhotoDTO) => Promise<PhotoDTO | null>;
  listPhotosByAlbum: (albumId: number) => Promise<PhotoDTO[] | null>;
  updatePhoto: (data: UpdatePhotoDTO) => Promise<PhotoDTO | null>;
  deletePhoto: (photoId: number) => Promise<void>;
}
