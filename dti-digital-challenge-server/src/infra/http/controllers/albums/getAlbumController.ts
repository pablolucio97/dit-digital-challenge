import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { GetAlbumUseCase } from 'src/domain/useCases/albums/getAlbumUseCase';

@Controller('/albums/get')
export class GetAlbumController {
  constructor(private getAlbumUseCase: GetAlbumUseCase) {}
  @Get(':userId')
  @HttpCode(200)
  async handle(@Param('userId') userId: string) {
    try {
      const album = await this.getAlbumUseCase.execute(parseInt(userId));
      return {
        STATUS: HttpStatus.OK,
        RES: album,
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
