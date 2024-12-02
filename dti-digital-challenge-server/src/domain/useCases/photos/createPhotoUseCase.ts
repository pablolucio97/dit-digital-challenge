import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhotoDTO } from 'src/domain/DTOs/photosDTO';
import { PhotosService } from 'src/domain/services/photos.service';

@Injectable()
export class CreatePhotoUseCase {
  constructor(private photosService: PhotosService) {}
  async execute(data: CreatePhotoDTO) {
    const { albumId, title } = data;
    const album = await this.photosService.checkAlbumExists(albumId);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    const photoExistsForAlbum =
      await this.photosService.checkPhotoTitleExistsForAlbum(albumId, title);

    if (photoExistsForAlbum) {
      throw new ConflictException(
        'Photo with this title already exists for this album',
      );
    }

    const newPhoto = await this.photosService.createPhoto(data);
    return newPhoto;
  }
}
