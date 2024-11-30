import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';
import { CreateAlbumUseCase } from 'src/domain/useCases/albums/createAlbumUseCase';
import { GetAlbumUseCase } from 'src/domain/useCases/albums/getAlbumUseCase';
import { ListAlbumsUseCase } from 'src/domain/useCases/albums/listAlbumsUseCase';
import { CreateAlbumController } from '../http/controllers/createAlbumController';
import { GetAlbumController } from '../http/controllers/getAlbumController';
import { ListAlbumsController } from '../http/controllers/listAlbumsController';
import { PrismaService } from '../services/PrismaService';

@Module({
  controllers: [
    CreateAlbumController,
    GetAlbumController,
    ListAlbumsController,
  ],
  providers: [
    PrismaService,
    AlbumsService,
    CreateAlbumUseCase,
    ListAlbumsUseCase,
    GetAlbumUseCase,
  ],
})
export class AlbumsModule {}
