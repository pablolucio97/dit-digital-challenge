import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/domain/services/albums.service';
import { PhotosService } from 'src/domain/services/photos.service';
import { CreatePhotoUseCase } from 'src/domain/useCases/photos/createPhotoUseCase';
import { DeletePhotoUseCase } from 'src/domain/useCases/photos/deletePhotoUseCase';
import { ListPhotosByAlbumUseCase } from 'src/domain/useCases/photos/listPhotosByAlbumUseCase';
import { CreatePhotoController } from '../http/controllers/photos/createPhotoController';
import { DeletePhotoController } from '../http/controllers/photos/deletePhotoController';
import { ListPhotosByAlbumController } from '../http/controllers/photos/listPhotosByAlbumController';
import { PrismaService } from '../services/PrismaService';

@Module({
  providers: [
    PrismaService,
    PhotosService,
    AlbumsService,
    CreatePhotoUseCase,
    ListPhotosByAlbumUseCase,
    DeletePhotoUseCase,
  ],
  controllers: [
    CreatePhotoController,
    ListPhotosByAlbumController,
    DeletePhotoController,
  ],
})
export class PhotosModule {}
