import { PhotoDTO } from './photosDTO';

export interface CreateAlbumDTO {
  title: string;
  userId: number;
}

export interface AlbumDTO {
  id: number;
  title: string;
  userId: number;
  photos?: PhotoDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateAlbumDTO {
  id: number;
  title: string;
  userId: number;
}
