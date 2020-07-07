import { initialState, actions, responseReducer } from '../responseReducer';

describe('', () => {
  const mockSuccessPayload = 'Success';
  const mockErrorPayload = 'Error';

  test('should return correct response correlated to the init action', () => {
    const response = responseReducer(null, {
      type: actions.INIT,
      payload: null
    });
    expect(response).toMatchObject({
      response: null,
      error: null,
      loading: true,
    });
  });

  test('should return correct response correlated to the success action', () => {
    const response = responseReducer(null, {
      type: actions.SUCCESS,
      payload: mockSuccessPayload
    });
    expect(response).toMatchObject({
      response: mockSuccessPayload,
      error: null,
      loading: false,
    });
  });

  test('should return correct response correlated to the error action', () => {
    const response = responseReducer(null, {
      type: actions.FAILURE,
      payload: mockErrorPayload
    });
    expect(response).toMatchObject({
      response: null,
      error: mockErrorPayload,
      loading: false,
    });
  });

  test('should return initialState for invalid action', () => {
    const response = responseReducer(null, { type: 'THIS_ACTION_TYPE_DOES_NOT_EXIST' });
    expect(response).toMatchObject(initialState);
  });

  test('should return initialState if no action type provided', () => {
    const response = responseReducer();
    expect(response).toMatchObject(initialState);
  });
});
