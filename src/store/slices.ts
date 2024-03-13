import { createSlice } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

import { GoodsType, ParamsType } from "../common/types/types";
import { carsApiService } from "../services/cars.service";
import { createAppAsyncThunk } from "./create-app-thunk";
import { AppDispatch, AppRootStateType } from "./store";

const initialState = {
  data: {} as GoodsType,
  user: {},
  // id: "",
  // buyItems: [] as GoodsType[] | [],
  // page: 1,
  // count: 5,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrenUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    // .addCase(deleteGood.fulfilled, (state, action) => {
    //   state.id = action.payload;
    // })
    // .addCase(returnEmpty.fulfilled, (state, action) => {
    //   state.data = action.payload as Goods;
    // })
    // .addCase(fetchSoldGoods.fulfilled, (state, action) => {
    //   state.buyItems = action.payload.data;
    // });
  },
});

const fetchGoods = createAppAsyncThunk<GoodsType, ParamsType | void>(
  "users/fetchUsers",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const goods = await carsApiService.getAll(arg);

      return goods.data;
    });
  },
);

export const userReducer = slice.reducer;
export const userActions = slice.actions;
export const userThunks = {
  fetchGoods,
};

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<
    AppRootStateType,
    any,
    AppDispatch,
    null | ResponseType
  >,
  logic: Function,
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    return rejectWithValue(null);
  }
};
