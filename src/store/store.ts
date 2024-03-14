import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AnyAction, combineReducers } from "redux";

import { userReducer } from "./slices";

const rootReducer = combineReducers({
  cars: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const selectCars = (state: AppRootStateType) => state.cars.data;
export const selectUser = (state: AppRootStateType) => state.cars.user;
export const selectCount = (state: AppRootStateType) => state.cars.count;
// export const selectBuy = (state: AppRootStateType) => state.users.buyItems;
