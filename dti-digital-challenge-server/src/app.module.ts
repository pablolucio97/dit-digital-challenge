import { Module } from '@nestjs/common';
import { AlbumsModule } from './infra/modules/albums.module';
import { PhotosModule } from './infra/modules/photos.module';
import { UsersModule } from './infra/modules/users.module';

@Module({
  imports: [AlbumsModule, PhotosModule, UsersModule],
})
export class AppModule {}
