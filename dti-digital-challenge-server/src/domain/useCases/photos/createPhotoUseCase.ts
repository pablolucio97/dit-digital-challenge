import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDTO } from 'src/domain/DTOs/photosDTO';
import { PhotosService } from 'src/domain/services/photos.service';

@Injectable()
export class CreatePhotoUseCase {
  constructor(private photosService: PhotosService) {}
  async execute(data: CreatePhotoDTO) {
    const { albumId } = data;
    const album = await this.photosService.checkAlbumExists(albumId);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    const newPhoto = await this.photosService.createPhoto(data);
    return newPhoto;
  }
}
