import authService from "../controllers/auth-service";
import InteractiveSignInRequired from "../utils/InteractiveSignInRequired";

const NETWORK_ERROR = Symbol.for("network.error");
const NETWORK_START = Symbol.for("network.start");
const NETWORK_STOP = Symbol.for("network.stop");
const SIGN_IN = Symbol.for("network.auth-sign-in");
const SIGN_OUT = Symbol.for("network.auth-sign-out");


export default {
    NETWORK_ERROR: NETWORK_ERROR,
    NETWORK_START: NETWORK_START,
    NETWORK_STOP: NETWORK_STOP,
    SIGN_IN: SIGN_IN,
    SIGN_OUT: SIGN_OUT,
};

const startNetwork   = () => ({ type: NETWORK_START });
const stopNetwork    = () => ({ type: NETWORK_STOP });
const networkError   = (error) => ({ type: NETWORK_ERROR, error });
const networkSignIn  = (identity) => ({ type: SIGN_IN, identity });
const networkSignOut = () => ({ type: SIGN_OUT });

/**
 * Public action for initializing the network module.  Tries to acquire
 * an auth token silently, and swallows an interactive sign-in required.
 */
export function initializeNetwork() {
    return async (dispatch) => {
        try {
            dispatch(startNetwork());
            const identity = await authService.getToken();
            dispatch(networkSignIn(identity));
            dispatch(stopNetwork());
        } catch (error) {
            dispatch(stopNetwork());
            if (!(error instanceof InteractiveSignInRequired)) {
                dispatch(networkError(error));
            }
        }
    };
}

/**
 * Action for initiating an interactive sign-in.
 */
export function signIn() {
    return async (dispatch) => {
        try {
            dispatch(startNetwork());
            const identity = await authService.signIn();
            dispatch(networkSignIn(identity));
            dispatch(stopNetwork());
        } catch (error) {
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
        dispatch(networkSignOut());
    };
}
