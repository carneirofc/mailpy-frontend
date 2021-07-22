import { AnyAction } from "redux";
import * as Actions from "../actions/symbols";

const initialState = {
  networkRequests: 0,
  identity: null,
  lastError: null,
  auth: {
    accessToken: null,
    apiAccessToken: null,
    idToken: null,
    name: null,
    username: null,
  },
  api: {
    user: null,
    groups: null,
    entries: null,
    conditions: null,
  },
};

const appReducer = function (state = initialState, action: AnyAction) {
  switch (action.type) {
    /** Pending network requests */
    case Actions.NETWORK_ERROR:
      return { ...state, lastError: action.error };
    case Actions.NETWORK_START:
      return { ...state, networkRequests: state.networkRequests + 1 };
    case Actions.NETWORK_STOP:
      return { ...state, networkRequests: state.networkRequests - 1 };

    /** Azure Identity */
    case Actions.SIGN_IN:
      const {
        accessToken,
        idToken,
        account: { name, username },
      } = action.identity;
      return {
        ...state,
        identity: action.identity,
        auth: { ...state.auth, name, username, accessToken, idToken },
      };
    case Actions.SIGN_OUT:
      return {
        ...state,
        identity: null,
        auth: {
          accessToken: null,
          apiAccessToken: null,
          idToken: null,
          name: null,
          username: null,
        },
      };
    case Actions.UPDATE_TOKEN:
      return { ...state, auth: { ...state.auth, apiAccessToken: action.accessToken } };

    /** Mailpy API data */
    case Actions.API_USER_INFO:
      return { ...state, api: { ...state.api, user: action.user } };

    default:
      return state;
  }
};
export default appReducer;
