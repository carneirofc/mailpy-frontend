import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "../reducers/AppReducer";

// const store = createStore(appReducer, enhancer);
const store = configureStore({ reducer: appReducer });
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
