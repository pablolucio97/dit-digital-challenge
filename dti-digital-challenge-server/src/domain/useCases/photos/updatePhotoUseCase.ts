import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePhotoDTO } from 'src/domain/DTOs/photosDTO';
import { PhotosService } from 'src/domain/services/photos.service';

@Injectable()
export class UpdatePhotoUseCase {
  constructor(private photosService: PhotosService) {}
  async execute(data: UpdatePhotoDTO) {
    const { id, title, albumId } = data;

    const photoExists = await this.photosService.checkPhotoExists(id);

    if (!photoExists) {
      throw new NotFoundException('Photo not found.');
    }

    if (title) {
      const photoTitleExists =
        await this.photosService.checkPhotoTitleExistsForAlbum(albumId, title);
      if (photoTitleExists) {
        throw new ConflictException(
          'A photo already exists for this provided title related to this album.',
        );
      }
    }

    const updatedPhoto = await this.photosService.updatePhoto(data);
    return updatedPhoto;
  }
}
