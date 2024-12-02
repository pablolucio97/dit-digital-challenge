import { PrismaService } from '../../../infra/services/PrismaService';
import { AlbumsService } from '../../services/albums.service';

const mockAlbumFindFirst = jest.fn();
const mockAlbumCreate = jest.fn();
jest.mock('../../../infra/services/PrismaService', () => {
  return {
    PrismaService: jest.fn().mockImplementation(() => ({
      album: {
        findFirst: mockAlbumFindFirst,
        create: mockAlbumCreate,
      },
    })),
  };
});

describe('createAlbum', () => {
  let service: AlbumsService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    service = new AlbumsService(prismaService);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create an album correctly when no existing album is found', async () => {
    const newAlbumData = { userId: 1, title: 'Summer 2024' };
    mockAlbumFindFirst.mockResolvedValue(null);
    mockAlbumCreate.mockResolvedValue(newAlbumData);

    const result = await service.createAlbum(newAlbumData);

    expect(mockAlbumCreate).toHaveBeenCalledWith({ data: newAlbumData });
    expect(result).toEqual(newAlbumData);
  });

  it('should return null when an album with the same title and user already exists', async () => {
    const newAlbumData = { userId: 1, title: 'Summer 2024' };
    mockAlbumFindFirst.mockResolvedValue(newAlbumData);

    const result = await service.createAlbum(newAlbumData);
    expect(result).toBeNull();
  });
});
