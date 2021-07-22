import authService from "../controllers/auth-service";
import api from "../controllers/api";
import { AppThunk } from "../app/store";
import * as ActionType from "./symbols";
import { startNetwork, stopNetwork, networkError } from "./network";

const authSignIn = (identity: string) => ({ type: ActionType.SIGN_IN, identity });
const authSignOut = () => ({ type: ActionType.SIGN_OUT });
const authUpdateToken = (token: any) => ({
  type: ActionType.UPDATE_TOKEN,
  accessToken: token.accessToken,
});

const apiUserInfo = (userInfo: any) => ({ type: ActionType.API_USER_INFO, user: userInfo });

/**
 * Action for initiating an interactive sign-in.
 */
export function signIn(): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(startNetwork());

      const identity = await authService.signIn();
      dispatch(authSignIn(identity));

      const token = await authService.acquireToken();

      if (token === null) {
        throw new Error("Failed to acquire token");
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
export function signOut(): AppThunk {
  return (dispatch) => {
    dispatch(startNetwork());
    authService.signOut();
    dispatch(stopNetwork());
    dispatch(authSignOut());
  };
}
