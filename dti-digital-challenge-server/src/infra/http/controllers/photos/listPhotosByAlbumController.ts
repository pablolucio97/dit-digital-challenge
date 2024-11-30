import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ListPhotosByAlbumUseCase } from 'src/domain/useCases/photos/listPhotosByAlbumUseCase';

@Controller('/photos/list-by-album')
export class ListPhotosByAlbumController {
  constructor(private listPhotosUseCase: ListPhotosByAlbumUseCase) {}
  @Get(':albumId')
  @HttpCode(200)
  async handle(@Param('albumId') albumId: string) {
    try {
      const photo = await this.listPhotosUseCase.execute(parseInt(albumId));
      return {
        STATUS: 'Success',
        RES: photo,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);
      throw new ConflictException({
        message:
          'An error occurred. Check all request body fields for possible mismatching.',
        error: error.message,
      });
    }
  }
}
