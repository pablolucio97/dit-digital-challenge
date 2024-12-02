import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      const newAlbum = await this.updateAlbumUseCase.execute(body);
      return {
        STATUS: HttpStatus.OK,
        RES: newAlbum,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      } else if (error instanceof ConflictException) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: error.message,
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
