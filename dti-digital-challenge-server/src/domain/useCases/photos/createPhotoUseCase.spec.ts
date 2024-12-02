import { PrismaService } from '../../../infra/services/PrismaService';
import { PhotosService } from '../../services/photos.service';

const mockedFindFirstPhoto = jest.fn();
const mockPhotoCreate = jest.fn();
const mockedFindUniqueAlbum = jest.fn();

jest.mock('../../../infra/services/PrismaService', () => {
  return {
    PrismaService: jest.fn().mockImplementation(() => ({
      photo: {
        findFirst: mockedFindFirstPhoto,
        create: mockPhotoCreate,
      },
      album: {
        findUnique: mockedFindUniqueAlbum,
      },
    })),
  };
});

describe('createPhoto', () => {
  let service: PhotosService;
  let prismaService: PrismaService;

  const newPhotoData = {
    albumId: 1,
    title: 'Photo 1',
    thumbnailUrl: 'https://via.placeholder.com/150/24f355',
    url: 'https://via.placeholder.com/600/24f355',
  };

  beforeEach(() => {
    prismaService = new PrismaService();
    service = new PhotosService(prismaService);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a photo register when no existing photo is found for the same album', async () => {
    mockedFindUniqueAlbum.mockResolvedValue({ id: 1, name: 'Album 1' });
    mockedFindFirstPhoto.mockResolvedValue(null);
    mockPhotoCreate.mockResolvedValue(newPhotoData);

    const result = await service.createPhoto(newPhotoData);
    expect(result).toEqual(newPhotoData);
  });
});
