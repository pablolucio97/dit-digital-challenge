import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
