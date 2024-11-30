import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAlbumDTO } from 'src/domain/DTOs/albumsDTO';
import { AlbumsService } from 'src/domain/services/albums.service';

@Injectable()
export class UpdateAlbumUseCase {
  constructor(private albumsService: AlbumsService) {}
  async execute(data: UpdateAlbumDTO) {
    const { id, title, userId } = data;

    const albumExists = await this.albumsService.checkAlbumExists(id);

    const albumTitleExists =
      await this.albumsService.checkAlbumTitleExistsForUser(userId, title);

    if (!albumExists) {
      throw new NotFoundException('Album not found.');
    }

    if (albumTitleExists) {
      throw new ConflictException(
        'An album already exists for this provided title for this user.',
      );
    }

    const updatedAlbum = await this.albumsService.updateAlbum(data);
    return updatedAlbum;
  }
}
