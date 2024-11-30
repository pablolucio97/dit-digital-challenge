import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UpdateAlbumDTO } from 'src/domain/DTOs/albumsDTO';
import { UpdateAlbumUseCase } from 'src/domain/useCases/albums/updateAlbumUseCase';
import { z } from 'zod';

const updateAlbumValidationSchema = z.object({
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

@Controller('/albums/update')
export class UpdateAlbumController {
  constructor(private updateAlbumUseCase: UpdateAlbumUseCase) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: UpdateAlbumDTO) {
    const isBodyValid = updateAlbumValidationSchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new ConflictException({
        message: 'The body format is invalid. Check the fields below:',
        error: isBodyValid.error.issues,
      });
    }

    try {
      const newAlbum = await this.updateAlbumUseCase.execute(body);
      return {
        STATUS: 'Success',
        RES: newAlbum,
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
