import { AlbumDTO, CreateAlbumDTO, UpdateAlbumDTO } from "../dtos/albumsDTO";

export interface AlbumsRepository {
  listAlbumsByUser(userId: number): Promise<AlbumDTO[]>;
  createAlbum(data: CreateAlbumDTO): Promise<AlbumDTO>;
  updateAlbum(data: UpdateAlbumDTO): Promise<AlbumDTO>;
  deleteAlbum(albumId: number): Promise<void>;
}