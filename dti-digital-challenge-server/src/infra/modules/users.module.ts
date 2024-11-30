import { Module } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';
import { ListUsersUseCase } from 'src/domain/useCases/users/listUsersUseCase';
import { ListUsersController } from '../http/controllers/users/listUsersController';

@Module({
  providers: [UsersService, ListUsersUseCase],
  controllers: [ListUsersController],
})
export class UsersModule {}
