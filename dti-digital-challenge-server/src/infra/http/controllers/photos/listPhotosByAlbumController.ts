import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
      const photos = await this.listPhotosUseCase.execute(parseInt(albumId));
      return {
        STATUS: HttpStatus.OK,
        RES: photos,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      } else {
        throw new InternalServerErrorException({
          message:
            'An error occurred. Check all request body fields for possible mismatching.',
          error: error.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}
