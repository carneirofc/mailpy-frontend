import { auth } from "../configs/msal";
import authService from "../controllers/auth-service";
import api from "../controllers/api";

import InteractiveSignInRequired from "../utils/InteractiveSignInRequired";

/** Networking */
const NETWORK_ERROR = Symbol.for("network.error");
const NETWORK_START = Symbol.for("network.start");
const NETWORK_STOP = Symbol.for("network.stop");

/** Azure ID */
const SIGN_IN = Symbol.for("auth.sign-in");
const SIGN_OUT = Symbol.for("auth.sign-out");
const UPDATE_USER_INFO = Symbol.for("auth.user-info");
const UPDATE_TOKEN = Symbol.for("auth.token");

/** Mailpy API */
const API_USER_INFO = Symbol.for("api.user-info");

// Redux thunk
const authSignIn = (identity) => ({ type: SIGN_IN, identity });
const authSignOut = () => ({ type: SIGN_OUT });
const authUpdateToken = (token) => ({
  type: UPDATE_TOKEN,
  accessToken: token.accessToken,
});
const startNetwork = () => ({ type: NETWORK_START });
const stopNetwork = () => ({ type: NETWORK_STOP });
const networkError = (error) => ({ type: NETWORK_ERROR, error });

const apiUserInfo = (userInfo) => ({ type: API_USER_INFO, user: userInfo });

/**
 * Action for initiating an interactive sign-in.
 */
export function signIn() {
  return async (dispatch) => {
    try {
      dispatch(startNetwork());

      const identity = await authService.signIn();
      dispatch(authSignIn(identity));

      const token = await authService.acquireToken();

      if (token === null) {
        throw "Failed to acquire token";
      }

      dispatch(authUpdateToken(token));
      const apiUserData = await api.getUserInfo();
      dispatch(apiUserInfo(apiUserData));
      dispatch(stopNetwork());
    } catch (error) {
      console.error("SignIn-Action", error);
      dispatch(stopNetwork());
      dispatch(networkError(error));
    }
  };
}

/**
 * Action for initiating a sign-out.
 */
export function signOut() {
  return (dispatch) => {
    dispatch(startNetwork());
    authService.signOut();
    dispatch(stopNetwork());
    dispatch(authSignOut());
  };
}

export default {
  NETWORK_ERROR: NETWORK_ERROR,
  NETWORK_START: NETWORK_START,
  NETWORK_STOP: NETWORK_STOP,
  SIGN_IN: SIGN_IN,
  SIGN_OUT: SIGN_OUT,
  UPDATE_TOKEN: UPDATE_TOKEN,
  UPDATE_USER_INFO: UPDATE_USER_INFO,

  API_USER_INFO: API_USER_INFO,
};
