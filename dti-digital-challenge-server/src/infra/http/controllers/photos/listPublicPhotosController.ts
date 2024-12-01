import { ConflictException, Controller, Get, HttpCode } from '@nestjs/common';
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
        STATUS: 'Success',
        RES: photos,
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
