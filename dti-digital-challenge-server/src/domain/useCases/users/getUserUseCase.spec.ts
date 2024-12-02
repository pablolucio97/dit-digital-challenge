import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UsersService } from '../../services/user.service';

const userId = 1;
const apiGetUserURL = `https://jsonplaceholder.typicode.com/users/${userId}`;

describe('getUser', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a single user', async () => {
    const mock = new MockAdapter(axios);

    const expectedUser = {
      id: 1,
      name: 'John Doe',
    };

    mock.onGet(apiGetUserURL).reply(200, expectedUser);

    const service = new UsersService();
    const user = await service.getUser(userId);
    expect(user).toEqual(expectedUser);
  });

  it('should return null when request fails', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(apiGetUserURL).networkError();

    const service = new UsersService();
    const user = await service.getUser(userId);
    expect(user).toEqual(null);
  });
});
