import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { ListAlbumsUseCase } from 'src/domain/useCases/albums/listAlbumsUseCase';

@Controller('/albums/list-by-user')
export class ListAlbumsController {
  constructor(private listAlbumsUseCase: ListAlbumsUseCase) {}
  @Get(':userId')
  @HttpCode(200)
  async handle(@Param('userId') userId: string) {
    try {
      const albums = await this.listAlbumsUseCase.execute(parseInt(userId));
      return {
        STATUS: HttpStatus.OK,
        RES: albums,
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
