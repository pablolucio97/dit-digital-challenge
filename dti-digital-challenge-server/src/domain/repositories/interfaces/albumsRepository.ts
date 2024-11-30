import {
  AlbumDTO,
  CreateAlbumDTO,
  UpdateAlbumDTO,
} from 'src/domain/DTOs/albumsDTO';

export interface AlbumsRepository {
  createAlbum: (data: CreateAlbumDTO) => Promise<AlbumDTO | null>;
  getAlbum: (userId: number) => Promise<AlbumDTO | null>;
  listAlbums: (userId: number) => Promise<AlbumDTO[]>;
  deleteAlbum: (albumId: number) => Promise<void>;
  updateAlbum: (data: UpdateAlbumDTO) => Promise<AlbumDTO | null>;
}
