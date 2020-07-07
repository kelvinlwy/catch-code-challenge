import { useReducer } from 'react';
import { actions, initialState, responseReducer } from './responseReducer';

/**
 * This custom hook is a general fetch action dispatcher.
 */
const useFetchDispatch = () => {
  const [results, dispatch] = useReducer(responseReducer, initialState);
  /**
   * Dispatch the action to initiate request
   */
  const init = () => dispatch({ type: actions.INIT });
  /**
   * Dispatch the action when the request completes successfully
   * @param {Object} response - The data returned in result of the request
   */
  const onSuccess = (response) => dispatch({
    type: actions.SUCCESS,
    payload: response,
  });
  /**
   * Dispatch the action when the request returns in result of error
   * @param {Object} error - The error response returned from fetch request
   */
  const onError = (error) => {
    dispatch({
      type: actions.FAILURE,
      payload: error,
    });
  };

  return {
    init,
    onSuccess,
    onError,
    results,
  };
};

export default useFetchDispatch;
