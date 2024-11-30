import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CreateAlbumDTO } from 'src/domain/DTOs/albumsDTO';
import { CreateAlbumUseCase } from 'src/domain/useCases/albums/createAlbumUseCase';
import { z } from 'zod';

const createAlbumValidationSchema = z.object({
  title: z.string(),
  userId: z.number(),
});

@Controller('/albums/create')
export class CreateAlbumController {
  constructor(private createAlbumUseCase: CreateAlbumUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAlbumDTO) {
    const isBodyValid = createAlbumValidationSchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new ConflictException({
        message: 'The body format is invalid. Check the fields below:',
        error: isBodyValid.error.issues,
      });
    }

    try {
      const newAlbum = await this.createAlbumUseCase.execute(body);
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
