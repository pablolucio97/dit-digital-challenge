import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';

@Injectable()
export class ListAlbumsUseCase {
  constructor(private albumsService: AlbumsService) {}
  async execute(userId: number) {
    const albums = await this.albumsService.listAlbums(userId);
    return albums;
  }
}
