export interface CreatePhotoDTO {
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: string;
}

export interface PhotoDTO {
  id: number;
  title: string;
  url: string;
  description: string;
  thumbnailUrl: string;
  albumId?: string;
  createdAt: Date;
  updatedAt: Date;
}
