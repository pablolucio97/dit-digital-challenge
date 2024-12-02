import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UsersService } from '../../services/user.service';

const apiListUsersURL = 'https://jsonplaceholder.typicode.com/users';

describe('listUsers', () => {
  it('should return a list of users when the request is successful', async () => {
    const mock = new MockAdapter(axios);
    const expectedUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Ervin Howell' },
    ];
    mock.onGet(apiListUsersURL).reply(200, expectedUsers);

    const service = new UsersService();
    const users = await service.listUsers();

    expect(users).toEqual(expectedUsers);
  });

  it('should return an empty array when the request fails', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(apiListUsersURL).networkError();

    const service = new UsersService();
    const users = await service.listUsers();

    expect(users).toEqual([]);
  });
});
