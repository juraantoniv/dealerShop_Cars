import { createSlice } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

import { DataCars, GoodsType, ParamsType } from "../common/types/types";
import { FormType } from "../components/postCarForm/postCar";
import { carsApiService } from "../services/cars.service";
import { createAppAsyncThunk } from "./create-app-thunk";
import { AppDispatch, AppRootStateType } from "./store";

const initialState = {
  data: {} as GoodsType,
  user: {},
  id: "",
  buyItems: [] as GoodsType[] | [],
  offset: 0,
  count: 5,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrenUser: (state, action) => {
      state.user = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
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
  "cars/fetchCars",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const goods = await carsApiService.getAll(arg);

      return goods.data;
    });
  },
);
const postCar = createAppAsyncThunk<DataCars, FormType>(
  "cars/postCar",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const goods = await carsApiService.postCar(arg);

      return goods.data;
    });
  },
);

const likeCar = createAppAsyncThunk<void, string>(
  "cars/likeCar",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await carsApiService.likeCar(arg);
    });
  },
);

export const userReducer = slice.reducer;
export const userActions = slice.actions;
export const userThunks = {
  fetchGoods,
  likeCar,
  postCar,
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
    console.log(e);
    return rejectWithValue(null);
  }
};
