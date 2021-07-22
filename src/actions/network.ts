import * as ActionType from "./symbols";

export const startNetwork = () => ({ type: ActionType.NETWORK_START });
export const stopNetwork = () => ({ type: ActionType.NETWORK_STOP });
export const networkError = (error: any) => ({ type: ActionType.NETWORK_ERROR, error });
