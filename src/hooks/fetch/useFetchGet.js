import { useCallback, useState } from 'react';
import useFetchDispatch from './useFetchDispatch';

/**
 * The custom hook is in use to perform the fetch GET request
 */
const useFetchGet = () => {
  const [statusCode, setStatusCode] = useState();
  const {
    init,
    onSuccess,
    onError,
    results,
  } = useFetchDispatch();

  const sendRequest = useCallback((url) => {
    // Initiate the request only if url provided
    if (!url) return;

    init();

    (
      async () => {
        try {
          const response = await fetch(url);
          setStatusCode(response.status);
          if (response.ok) {
            onSuccess(await response.json());
          } else {
            onError(response);
          }
        } catch (err) {
          onError(err);
        }
      }
    )();
  }, [onSuccess, onError, init]);

  return {
    ...results,
    fetch: sendRequest,
    statusCode,
  };
};

export default useFetchGet;
