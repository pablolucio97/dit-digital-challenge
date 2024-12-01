import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
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
      throw new ConflictException({
        message:
          'An error occurred. Check all request body fields for possible mismatching.',
        error: error.message,
      });
    }
  }
}
