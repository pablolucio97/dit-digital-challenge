import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
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
        message: HttpStatus.BAD_REQUEST,
        error: isBodyValid.error.issues,
      });
    }

    try {
      const newPhoto = await this.createPhotoUseCase.execute(body);
      return {
        STATUS: HttpStatus.OK,
        RES: newPhoto,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);
      if (error.status && error.status === HttpStatus.CONFLICT) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: error.message,
          error: error.detail,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred. Please try again.',
          error: error.message,
        });
      }
    }
  }
}
