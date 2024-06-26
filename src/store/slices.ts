import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosError } from "axios";

import {
  DataCars,
  GoodsType,
  ParamsType,
  UserInfoType,
} from "../common/types/types";
import { FormType } from "../components/postCarForm/postCar";
import { carsApiService } from "../services/cars.service";
import { createAppAsyncThunk } from "./create-app-thunk";
import { AppDispatch, AppRootStateType } from "./store";

const initialState = {
  data: {} as GoodsType,
  user: {} as UserInfoType,
  id: "",
  offset: 0,
  count: 5,
  loading: "",
  carId: "",
  darkMode: false,
  sort: true,
  lang: "eng",
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
    logOff: (state, action) => {
      state.data = action.payload;
    },
    setCarId: (state, action) => {
      state.carId = action.payload;
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addMatcher(isPending(userThunks.fetchGoods), (state) => {
      state.loading = "loading";
    });
    builder.addMatcher(isRejected(userThunks.fetchGoods), (state) => {
      state.loading = "fulfilled";
    });
    builder.addMatcher(isFulfilled(userThunks.fetchGoods), (state) => {
      state.loading = "fulfilled";
    });
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
    if (e instanceof AxiosError) {
      return rejectWithValue(e?.response?.data.messages);
    }
  }
};
