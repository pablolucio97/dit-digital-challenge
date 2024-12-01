import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';
import { PhotosService } from 'src/domain/services/photos.service';
import { CreatePhotoUseCase } from 'src/domain/useCases/photos/createPhotoUseCase';
import { DeletePhotoUseCase } from 'src/domain/useCases/photos/deletePhotoUseCase';
import { ListPhotosByAlbumUseCase } from 'src/domain/useCases/photos/listPhotosByAlbumUseCase';
import { ListPublicPhotosUseCase } from 'src/domain/useCases/photos/listPublicPhotosUseCase';
import { UpdatePhotoUseCase } from 'src/domain/useCases/photos/updatePhotoUseCase';
import { CreatePhotoController } from '../http/controllers/photos/createPhotoController';
import { DeletePhotoController } from '../http/controllers/photos/deletePhotoController';
import { ListPhotosByAlbumController } from '../http/controllers/photos/listPhotosByAlbumController';
import { ListPublicPhotosController } from '../http/controllers/photos/listPublicPhotosController';
import { UpdatePhotoController } from '../http/controllers/photos/updatePhotoController';
import { PrismaService } from '../services/PrismaService';

@Module({
  providers: [
    PrismaService,
    PhotosService,
    AlbumsService,
    CreatePhotoUseCase,
    ListPhotosByAlbumUseCase,
    DeletePhotoUseCase,
    ListPublicPhotosUseCase,
    UpdatePhotoUseCase,
  ],
  controllers: [
    CreatePhotoController,
    ListPhotosByAlbumController,
    DeletePhotoController,
    ListPublicPhotosController,
    UpdatePhotoController,
  ],
})
export class PhotosModule {}
