import Actions from "../actions/Actions";

const initialState = {
  networkRequests: 0,
  identity: null,
  lastError: null,
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
      return { ...state, identity: action.identity };
    case Actions.SIGN_OUT:
      return { ...state, identity: null };
    default:
      return state;
  }
}
