import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ListAlbumsUseCase } from 'src/domain/useCases/albums/listAlbumsUseCase';

@Controller('/albums/list')
export class ListAlbumsController {
  constructor(private listAlbumsUseCase: ListAlbumsUseCase) {}
  @Get(':userId')
  @HttpCode(200)
  async handle(@Param('userId') userId: string) {
    try {
      const album = await this.listAlbumsUseCase.execute(parseInt(userId));
      return {
        STATUS: 'Success',
        RES: album,
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