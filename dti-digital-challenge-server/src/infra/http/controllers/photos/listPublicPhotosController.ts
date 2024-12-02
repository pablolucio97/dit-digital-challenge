import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ListPublicPhotosUseCase } from 'src/domain/useCases/photos/listPublicPhotosUseCase';

@Controller('/photos/list-publics')
export class ListPublicPhotosController {
  constructor(private listPublicPhotosUseCase: ListPublicPhotosUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const photos = await this.listPublicPhotosUseCase.execute();
      return {
        STATUS: HttpStatus.OK,
        RES: photos,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);
      throw new InternalServerErrorException({
        message:
          'An error occurred. Check all request body fields for possible mismatching.',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
