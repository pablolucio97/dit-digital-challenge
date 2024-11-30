import { Module } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';
import { GetUserUseCase } from 'src/domain/useCases/users/getUserUseCase';
import { ListUsersUseCase } from 'src/domain/useCases/users/listUsersUseCase';
import { GetUserController } from '../http/controllers/users/getUserController';
import { ListUsersController } from '../http/controllers/users/listUsersController';

@Module({
  providers: [UsersService, ListUsersUseCase, GetUserUseCase],
  controllers: [ListUsersController, GetUserController],
})
export class UsersModule {}
