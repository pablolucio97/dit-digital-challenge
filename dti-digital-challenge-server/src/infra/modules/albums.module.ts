import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';
import { CreateAlbumUseCase } from 'src/domain/useCases/albums/createAlbumUseCase';
import { DeleteAlbumUseCase } from 'src/domain/useCases/albums/deleteAlbumUseCase';
import { GetAlbumUseCase } from 'src/domain/useCases/albums/getAlbumUseCase';
import { ListAlbumsUseCase } from 'src/domain/useCases/albums/listAlbumsUseCase';
import { UpdateAlbumUseCase } from 'src/domain/useCases/albums/updateAlbumUseCase';
import { CreateAlbumController } from '../http/controllers/createAlbumController';
import { DeleteAlbumController } from '../http/controllers/deleteAlbumController';
import { GetAlbumController } from '../http/controllers/getAlbumController';
import { ListAlbumsController } from '../http/controllers/listAlbumsController';
import { UpdateAlbumController } from '../http/controllers/updateAlbumController';
import { PrismaService } from '../services/PrismaService';

@Module({
  controllers: [
    CreateAlbumController,
    GetAlbumController,
    ListAlbumsController,
    DeleteAlbumController,
    UpdateAlbumController,
  ],
  providers: [
    PrismaService,
    AlbumsService,
    CreateAlbumUseCase,
    ListAlbumsUseCase,
    GetAlbumUseCase,
    DeleteAlbumUseCase,
    UpdateAlbumUseCase,
  ],
})
export class AlbumsModule {}
