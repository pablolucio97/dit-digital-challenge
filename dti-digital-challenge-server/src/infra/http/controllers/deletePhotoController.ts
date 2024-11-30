import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';
import { DeletePhotoUseCase } from 'src/domain/useCases/photos/deletePhotoUseCase';

@Controller('/photos/delete')
export class DeletePhotoController {
  constructor(private deletePhotoUseCase: DeletePhotoUseCase) {}
  @Delete(':id')
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    try {
      await this.deletePhotoUseCase.execute(parseInt(id));
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
