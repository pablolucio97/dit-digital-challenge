export interface CreatePhotoDTO {
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

export interface PhotoDTO {
  id: number;
  title: string;
  url: string;
  description?: string | null;
  thumbnailUrl: string;
  albumId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdatePhotoDTO {
  id: number;
  title?: string;
  description?: string;
  albumId: number;
}
