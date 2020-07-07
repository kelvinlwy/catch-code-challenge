/**
 * This is the initial state prior to the request is made.
 * @type {{response: null, error: null, loading: boolean}}
 * @property response - No data is returned in initial response
 * @property error - No error is stated in initial response
 * @property loading - The loading state is set to false as default.
 */
const initialState = {
  response: null,
  error: null,
  loading: false,
};

/**
 * The collection of action types which are used to indicate the type of action being performed.
 */
const actions = {
  INIT: 'INITIALISE_REQUEST', // the action to dispatch when a request is initiated
  SUCCESS: 'SUCCESS', // the action to dispatch when a request completes successfully
  FAILURE: 'FAILURE', // the action to dispatch when a request results in error
};

/**
 * The response reducer specifies the response's state changes in respect to the action to dispatch
 * @param {Object} state - The previous state or the initial state if no action has been invoked
 * @param {String} type - The action type
 * @param payload
 * @return {{response: null, error: null, loading: boolean}}
 */
const responseReducer = (state = initialState, { type, payload } = {}) => {
  if (!type) return initialState;

  switch (type) {
    case actions.INIT:
      return {
        response: null,
        error: null,
        loading: true,
      };
    case actions.SUCCESS:
      return {
        response: payload,
        error: null,
        loading: false,
      };
    case actions.FAILURE:
      return {
        response: null,
        error: payload,
        loading: false,
      };
    default:
      return initialState;
  }
};

export {
  initialState,
  actions,
  responseReducer,
};
