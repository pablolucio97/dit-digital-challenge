import { Module } from '@nestjs/common';
import { AlbumsModule } from './infra/modules/albums.module';
import { PhotosModule } from './infra/modules/photos.module';

@Module({
  imports: [AlbumsModule, PhotosModule],
})
export class AppModule {}
