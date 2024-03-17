import { z } from "zod";

import { GoodsType, ParamsType } from "../common/types/types";
import { FormType } from "../components/postCarForm/postCar";
import { instance } from "./interceptors/interceptors";

export const carsApiService = {
  getAll: (params?: ParamsType | void) =>
    instance.get<GoodsType>(`/cars`, {
      params: {
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
        offset: params?.offset,
        ORDER: params?.ORDER,
      },
    }),
  likeCar: (id: string) => instance.post<void>(`cars/like/${id}`),
  postCar: (data: FormType) =>
    instance.post<GoodsType>(
      `/cars`,
      {
        brand: data.brand,
        description: data.description,
        model: data.model,
        price: data.price,
        image: data.image,
        currency_type: "UAH",
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    ),
  orderCar: (id: string) => instance.post<void>(`cars/buy/${id}`),
};
