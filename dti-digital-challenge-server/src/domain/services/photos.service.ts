import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/PrismaService';
import { CreatePhotoDTO, PhotoDTO } from '../DTOs/photosDTO';
import { PhotosRepository } from '../repositories/interfaces/photosRepository';

@Injectable()
export class PhotosService implements PhotosRepository {
  constructor(private prismaService: PrismaService) {}
  async createPhoto(data: CreatePhotoDTO): Promise<PhotoDTO | null> {
    const { albumId } = data;

    const album = await this.checkAlbumExists(albumId);

    if (!album) {
      return null;
    }

    const newPhoto = await this.prismaService.photo.create({ data });
    return newPhoto;
  }

  async listPhotosByAlbum(albumId: number): Promise<PhotoDTO[] | null> {
    const album = await this.checkAlbumExists(albumId);

    if (!album) {
      return null;
    }

    const photos = await this.prismaService.photo.findMany({
      where: {
        albumId,
      },
    });
    return photos;
  }

  async deletePhoto(id: number): Promise<void> {
    await this.prismaService.photo.delete({ where: { id } });
  }

  async checkAlbumExists(id: number) {
    const album = await this.prismaService.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      return null;
    }

    return album;
  }

  async checkPhotoExists(id: number) {
    const photo = await this.prismaService.photo.findUnique({
      where: {
        id,
      },
    });

    if (!photo) {
      return null;
    }

    return photo;
  }
}
