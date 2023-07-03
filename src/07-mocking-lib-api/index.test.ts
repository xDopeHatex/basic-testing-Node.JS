// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const create = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const path = 'path';
    const data = { data: 'ok' };
    const get = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce(data);

    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(create).toHaveReturnedWith(
      expect.objectContaining({
        defaults: expect.objectContaining({
          baseURL: baseURL,
        }),
      }),
    );

    get.mockRestore();
    create.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const path = 'path';
    const data = { data: 'ok' };
    const get = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => data);

    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(get).toHaveBeenCalledWith(path);
    get.mockRestore();
  });

  test('should return response data', async () => {
    const path = 'path';
    const data = { data: 'ok' };
    const get = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(async () => data);

    const response = await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(response).toEqual(data.data);

    get.mockRestore();
  });
});
