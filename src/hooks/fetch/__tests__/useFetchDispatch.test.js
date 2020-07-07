import { act, renderHook } from '@testing-library/react-hooks';
import useFetchDispatch from '../useFetchDispatch';

describe('test useFetchDispatch', () => {
  test('should return init method, onSuccess method, onError method, and results object', () => {
    const { result } = renderHook(() => useFetchDispatch());
    const { init, onError, onSuccess, results } = result.current;
    expect(init).toBeDefined();
    expect(onError).toBeDefined();
    expect(onSuccess).toBeDefined();
    expect(results).toBeDefined();
  });

  test('should return a loading state is set as true once fetch has been initialised', async () => {
    const { result } = renderHook(() => useFetchDispatch());
    await act(async () => result.current.init());
    const { results: { response, error, loading } } = result.current;
    expect(loading).toBeTruthy();
    expect(response).toBeNull();
    expect(error).toBeNull();
  });

  test('should return data with a successful request', async () => {
    const mockSuccessData = 'Test';
    const { result } = renderHook(() => useFetchDispatch());
    await act(async () => result.current.onSuccess(mockSuccessData));
    const { results: { response, error, loading } } = result.current;
    expect(loading).toBeFalsy();
    expect(response).toEqual(mockSuccessData);
    expect(error).toBeNull();
  });

  test('should return error when invoke onError ', async () => {
    const mockError = 'Error';
    const { result } = renderHook(() => useFetchDispatch());
    await act(async () => result.current.onError(mockError));
    const { results: { response, error, loading } } = result.current;
    expect(loading).toBeFalsy();
    expect(error).toEqual(mockError);
    expect(response).toBeNull();
  });
});
