import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAlbumDTO } from 'src/domain/DTOs/albumsDTO';
import { AlbumsService } from 'src/domain/services/albums.service';

@Injectable()
export class CreateAlbumUseCase {
  constructor(private albumsService: AlbumsService) {}
  async execute(data: CreateAlbumDTO) {
    const { userId, title } = data;
    const albumExists = await this.albumsService.checkAlbumExists(
      userId,
      title,
    );
    if (albumExists) {
      throw new ConflictException('Album already exists for this user.');
    }

    const newAlbum = await this.albumsService.createAlbum(data);
    return newAlbum;
  }
}
