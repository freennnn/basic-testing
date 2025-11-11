// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

// Call throttledGetDataFromApi('apiPath')
//   ↓
// Lodash throttle mock: (fn) => fn
//   ↓ (throttle bypassed, calls immediately)
// getDataFromApi('apiPath')
//   ↓
// axios.create({ baseURL: 'https://...' })
//   ↓ (createSpy intercepts)
// mockAxiosInstance
//   ↓
// mockAxiosInstance.get('apiPath')
//   ↓ (jest.fn().mockResolvedValue intercepts)
// Returns Promise<{ data: 'I am your data. and tata.' }>
//   ↓
// return response.data
//   ↓
// Returns 'I am your data. and tata.'


jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const mockedResponse = { data: 'I am your data. and tata.' };
const relativePath = 'apiPath';

describe('throttledGetDataFromApi', () => {
  afterAll(() => {
    jest.unmock('lodash');
  });
  let createSpy: jest.SpyInstance;
  let mockAxiosInstance: { get: jest.Mock };

  beforeEach(() => {
    // Create a fresh mock function for 'get' for each test
    mockAxiosInstance = {
      get: jest.fn().mockResolvedValue(mockedResponse),
    };
    // Spy on axios.create and make it return our mock instance
    createSpy = jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockAxiosInstance as unknown as AxiosInstance);
  });

  afterEach(() => {
    // Restore the original implementation after each test
    createSpy.mockRestore();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toBe(mockedResponse.data);
  });
});
