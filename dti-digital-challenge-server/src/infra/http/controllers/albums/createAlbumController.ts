import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
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
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      const newAlbum = await this.createAlbumUseCase.execute(body);
      return {
        STATUS: HttpStatus.CREATED,
        RES: newAlbum,
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
