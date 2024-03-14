import { GoodsType, ParamsType } from "../common/types/types";
import { instance } from "./interceptors/interceptors";

export const carsApiService = {
  getAll: (params?: ParamsType | void) =>
    instance.get<GoodsType>(`/cars`, {
      params: {
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
        offset: params?.offset,
      },
    }),
  likeCar: (id: string) => instance.post<void>(`cars/like/${id}`),
};
