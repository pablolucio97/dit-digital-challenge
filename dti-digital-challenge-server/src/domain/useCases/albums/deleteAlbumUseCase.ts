import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';

@Injectable()
export class DeleteAlbumUseCase {
  constructor(private albumsService: AlbumsService) {}
  async execute(albumId: number) {
    await this.albumsService.deleteAlbum(albumId);
  }
}
