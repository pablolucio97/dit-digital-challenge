import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CreatePhotoDTO } from 'src/domain/DTOs/photosDTO';
import { CreatePhotoUseCase } from 'src/domain/useCases/photos/createPhotoUseCase';
import { z } from 'zod';

const createPhotoValidationSchema = z.object({
  title: z.string(),
  thumbnailUrl: z.string(),
  url: z.string(),
  albumId: z.number(),
});

@Controller('/photos/create')
export class CreatePhotoController {
  constructor(private createPhotoUseCase: CreatePhotoUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreatePhotoDTO) {
    const isBodyValid = createPhotoValidationSchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new ConflictException({
        message: 'The body format is invalid. Check the fields below:',
        error: isBodyValid.error.issues,
      });
    }

    try {
      const newPhoto = await this.createPhotoUseCase.execute(body);
      return {
        STATUS: 'Success',
        RES: newPhoto,
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
