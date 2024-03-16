export type ITokensForRefresh = {
  accessToken: string;
  refreshToken: string;
};

export type GoodsType = {
  page: number;
  limit: number;
  total: number;
  data: DataCars[];
};

export type UserInfoType = {
  name?: string;
  city?: string;
  age?: string;
  avatar?: string;
};

export type DataCars = {
  id: string;
  model: string;
  brand: string;
  description: string;
  image?: string;
  views?: [];
  likes?: [];
  currency: [];
  createdAt: string;
  updatedAt: string;
  boughtBy?: string;
};

export type ParamsType = {
  page?: string;
  limit?: string;
  price?: number;
  search?: string;
  offset?: string;
  ORDER?: string;
};

export type ITokensPair = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    name: string;
    role: string;
  };
};
