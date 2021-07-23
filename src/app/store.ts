import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "../reducers/AppReducer";
import mailpyReducer from "../actions/mailpy";

// const store = createStore(appReducer, enhancer);
const store = configureStore({ reducer: { appReducer, mailpy: mailpyReducer } });
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
