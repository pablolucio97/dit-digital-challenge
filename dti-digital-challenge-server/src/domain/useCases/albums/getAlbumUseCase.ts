import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';

@Injectable()
export class GetAlbumUseCase {
  constructor(private albumsService: AlbumsService) {}
  async execute(albumId: number) {
    const album = await this.albumsService.getAlbum(albumId);
    return album;
  }
}
