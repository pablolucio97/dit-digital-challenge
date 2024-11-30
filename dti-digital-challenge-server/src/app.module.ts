import { Module } from '@nestjs/common';
import { AlbumsModule } from './infra/modules/albums.module';

@Module({
  imports: [AlbumsModule],
})
export class AppModule {}
