import Actions from "../actions/Actions";

const initialState = {
  networkRequests: 0,
  identity: null,
  lastError: null,
  auth: {
    accessToken: null,
    name: null,
    username: null,
    idToken: null,
    apiAccessToken: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.NETWORK_ERROR:
      return { ...state, lastError: action.error };
    case Actions.NETWORK_START:
      return { ...state, networkRequests: state.networkRequests + 1 };
    case Actions.NETWORK_STOP:
      return { ...state, networkRequests: state.networkRequests - 1 };

    case Actions.SIGN_IN:
      const {
        accessToken,
        idToken,
        account: { name, username },
      } = action.identity;
      return { ...state, identity: action.identity, auth: { name, username, accessToken, idToken } };
    case Actions.SIGN_OUT:
      return { ...state, identity: null, auth: {} };
    case Actions.UPDATE_TOKEN:
      return { ...state, auth: { ...state.auth, apiAccessToken: action.accessToken } };
    default:
      return state;
  }
}
