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
import { UpdatePhotoDTO } from 'src/domain/DTOs/photosDTO';
import { UpdatePhotoUseCase } from 'src/domain/useCases/photos/updatePhotoUseCase';
import { z } from 'zod';

const updatePhotoValidationSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  albumId: z.number(),
});

@Controller('/photos/update')
export class UpdatePhotoController {
  constructor(private updatePhotoUseCase: UpdatePhotoUseCase) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: UpdatePhotoDTO) {
    const isBodyValid = updatePhotoValidationSchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new ConflictException({
        message: 'The body format is invalid. Check the fields below:',
        error: isBodyValid.error.issues,
      });
    }

    try {
      const newPhoto = await this.updatePhotoUseCase.execute(body);
      return {
        STATUS: 'Success',
        RES: newPhoto,
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
