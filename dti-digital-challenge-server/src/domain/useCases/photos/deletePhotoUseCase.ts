import { Injectable, NotFoundException } from '@nestjs/common';
import { PhotosService } from 'src/domain/services/photos.service';

@Injectable()
export class DeletePhotoUseCase {
  constructor(private photosService: PhotosService) {}
  async execute(photoId: number) {
    const photo = await this.photosService.checkPhotoExists(photoId);

    if (!photo) {
      throw new NotFoundException('Photo not found.');
    }

    await this.photosService.deletePhoto(photoId);
  }
}
