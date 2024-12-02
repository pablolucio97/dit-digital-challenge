import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { DeleteAlbumUseCase } from 'src/domain/useCases/albums/deleteAlbumUseCase';

@Controller('/albums/delete')
export class DeleteAlbumController {
  constructor(private deleteAlbumUseCase: DeleteAlbumUseCase) {}
  @Delete(':id')
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    try {
      await this.deleteAlbumUseCase.execute(parseInt(id));
      return {
        STATUS: HttpStatus.OK,
        RES: null,
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
