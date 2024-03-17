import {
  AnyAction,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { userReducer } from "./slices";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type AppRootStateType = ReturnType<typeof persistedReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const selectCars = (state: AppRootStateType) => state.data;
export const selectUser = (state: AppRootStateType) => state.user;
export const selectCount = (state: AppRootStateType) => state.count;
export const setOffset = (state: AppRootStateType) => state.offset;
export const loadingStatus = (state: AppRootStateType) => state.loading;
export const carId = (state: AppRootStateType) => state.carId;
