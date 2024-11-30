import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
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
        STATUS: 'Success',
        RES: null,
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
