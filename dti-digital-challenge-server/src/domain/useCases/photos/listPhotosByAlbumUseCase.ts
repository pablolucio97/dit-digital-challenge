import { Injectable, NotFoundException } from '@nestjs/common';
import { PhotosService } from 'src/domain/services/photos.service';

@Injectable()
export class ListPhotosByAlbumUseCase {
  constructor(private photosService: PhotosService) {}
  async execute(albumId: number) {
    const album = await this.photosService.checkAlbumExists(albumId);
    if (!album) {
      throw new NotFoundException('Album not found.');
    }
    const photos = await this.photosService.listPhotosByAlbum(albumId);
    return photos;
  }
}
