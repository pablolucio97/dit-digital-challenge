import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/services/PrismaService';
import { AlbumDTO, CreateAlbumDTO, UpdateAlbumDTO } from '../DTOs/albumsDTO';
import { AlbumsRepository } from '../repositories/interfaces/albumsRepository';

@Injectable()
export class AlbumsService implements AlbumsRepository {
  constructor(private prismaService: PrismaService) {}
  async createAlbum(data: CreateAlbumDTO) {
    const { title, userId } = data;

    const albumAlreadyExists = await this.prismaService.album.findFirst({
      where: {
        title,
        userId,
      },
    });

    if (albumAlreadyExists) {
      return null;
    }

    const newAlbum = await this.prismaService.album.create({ data });
    return newAlbum;
  }

  async getAlbum(userId: number): Promise<AlbumDTO | null> {
    const album = await this.prismaService.album.findFirst({
      where: {
        userId,
      },
    });
    return album || null;
  }

  async listAlbums(userId: number): Promise<AlbumDTO[]> {
    const album = await this.prismaService.album.findMany({
      where: {
        userId,
      },
    });
    return album;
  }

  async deleteAlbum(albumId: number): Promise<void> {
    await this.prismaService.album.delete({
      where: {
        id: albumId,
      },
    });
  }

  async updateAlbum(data: UpdateAlbumDTO): Promise<AlbumDTO | null> {
    const { id, title } = data;

    const album = await this.prismaService.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      return null;
    }

    const updatedAlbum = await this.prismaService.album.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return updatedAlbum;
  }

  async checkAlbumTitleExistsForUser(
    userId: number,
    title: string,
  ): Promise<AlbumDTO | null> {
    const albumExists = await this.prismaService.album.findFirst({
      where: {
        userId,
        title,
      },
    });
    return albumExists;
  }

  async checkAlbumExists(id: number): Promise<AlbumDTO | null> {
    const albumExists = await this.prismaService.album.findUnique({
      where: {
        id,
      },
    });
    return albumExists;
  }
}
