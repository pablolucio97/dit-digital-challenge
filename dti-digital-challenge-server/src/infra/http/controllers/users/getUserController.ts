import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
import { GetUserUseCase } from 'src/domain/useCases/users/getUserUseCase';

@Controller('/users/get')
export class GetUserController {
  constructor(private getUsersUseCase: GetUserUseCase) {}
  @Get(':userId')
  @HttpCode(200)
  async handle(@Param('userId') userId: number) {
    try {
      const users = await this.getUsersUseCase.execute(userId);
      return {
        STATUS: 'Success',
        RES: users,
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
