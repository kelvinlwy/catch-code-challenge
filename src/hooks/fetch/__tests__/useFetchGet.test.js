import { act, renderHook } from '@testing-library/react-hooks';
import useFetchGet from '../useFetchGet';
import useFetchDispatch from '../useFetchDispatch';
const mockInit = jest.fn();
const mockOnSuccess = jest.fn();
const mockOnError = jest.fn();

jest.mock('../useFetchDispatch', () => ({
  __esModule: true,
  default: jest.fn()
}));

useFetchDispatch.mockImplementation(() => ({
  init: mockInit,
  onSuccess: mockOnSuccess,
  onError: mockOnError,
  results: {
    loading: false,
    response: null,
    error: null
  }
}));

describe('test useFetchGet', () => {

  const mockUrl = 'http://localhost';

  afterEach(jest.clearAllMocks);

  test('should return fetch method, loading property, response property, and error property', () => {
    const { result } = renderHook(() => useFetchGet());
    const { loading, response, error, fetch } = result.current;
    expect(fetch).toBeDefined();
    expect(loading).toBeDefined();
    expect(response).toBeDefined();
    expect(error).toBeDefined();
  });

  test('should invoke init, fetch, onSuccess if url provided in request and returns ok is true', async () => {
    const mockFetchResponse = {
      ok: true,
      status: '',
      json: () => {
        return {};
      },
    };
    global.fetch = jest.fn().mockImplementationOnce((url) => {
      return new Promise((resolve) => {
        resolve(mockFetchResponse);
      });
    });
    const { result } = renderHook(() => useFetchGet());
    const { fetch } = result.current;
    await act(async () => fetch(mockUrl));
    expect(mockInit).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenLastCalledWith(mockUrl);
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    expect(mockOnSuccess).toHaveBeenLastCalledWith({});
  });

  test('should invoke init, fetch, onError if url provided in request and returns ok is false', async () => {
    const mockFetchResponse = {
      ok: false,
      status: '',
      json: () => {
        return {};
      },
    };
    global.fetch = jest.fn().mockImplementationOnce((url) => {
      return new Promise((resolve) => {
        resolve(mockFetchResponse);
      });
    });
    const { result } = renderHook(() => useFetchGet());
    const { fetch } = result.current;
    await act(async () => fetch(mockUrl));
    expect(mockInit).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenLastCalledWith(mockUrl);
    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenLastCalledWith(mockFetchResponse);
  });

  test('should invoke init, fetch, onError if the request returns Error', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Error'));
    const { result } = renderHook(() => useFetchGet());
    const { fetch } = result.current;
    await act(async () => fetch(mockUrl));
    expect(mockInit).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenLastCalledWith(mockUrl);
    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(new Error('Error'));
  });
});
