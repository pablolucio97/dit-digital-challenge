import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/infra/services/PrismaService';
import { CreatePhotoDTO, PhotoDTO, UpdatePhotoDTO } from '../DTOs/photosDTO';
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
      include: {
        album: {
          select: {
            title: true,
            userId: true,
          },
        },
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

  async listPublicPhotos(): Promise<PhotoDTO[]> {
    const MAX_PHOTOS_TO_FETCH = 20;

    try {
      const { data } = await axios.get<PhotoDTO[]>(
        'https://jsonplaceholder.typicode.com/photos',
      );
      if (data) {
        return data.slice(0, MAX_PHOTOS_TO_FETCH);
      }
      return [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async updatePhoto(data: UpdatePhotoDTO): Promise<PhotoDTO | null> {
    const { id } = data;

    const photo = await this.prismaService.photo.findUnique({
      where: {
        id,
      },
    });

    if (!photo) {
      return null;
    }

    const updatedPhoto = await this.prismaService.photo.update({
      where: {
        id,
      },
      data,
    });

    return updatedPhoto;
  }

  async checkPhotoTitleExistsForAlbum(
    albumId: number,
    title: string,
  ): Promise<PhotoDTO | null> {
    const photoExists = await this.prismaService.photo.findFirst({
      where: {
        albumId,
        title,
      },
    });
    return photoExists;
  }
}
