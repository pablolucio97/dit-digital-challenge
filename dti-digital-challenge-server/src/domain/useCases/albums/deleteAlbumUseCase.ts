import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';

@Injectable()
export class DeleteAlbumUseCase {
  constructor(private albumsService: AlbumsService) {}
  async execute(albumId: number) {
    const album = await this.albumsService.checkAlbumExists(albumId);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    await this.albumsService.deleteAlbum(albumId);
  }
}
