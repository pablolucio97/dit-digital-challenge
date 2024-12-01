import { Injectable } from '@nestjs/common';
import { PhotosService } from 'src/domain/services/photos.service';

@Injectable()
export class ListPublicPhotosUseCase {
  constructor(private photosService: PhotosService) {}
  async execute() {
    const photos = await this.photosService.listPublicPhotos();
    return photos;
  }
}
