import { z } from "zod";

import { ITokensForRefresh, ITokensPair } from "../common/types/types";
import { FormType } from "../components/loginComponent/loginComponent";
import { FormTypeCreateUser } from "../components/myAccountForm/createAccount";
import { FormTypeForUpdate } from "../components/myAccountForm/myAccount";
import { instance } from "./interceptors/interceptors";

export const authService = {
  login: (user: FormType) =>
    instance.post<ITokensPair>("/auth/sign-in", {
      ...user,
      deviceId: "1",
    }),
  refresh: (refreshToken: string) =>
    instance.post<ITokensForRefresh>("/auth/refresh", {
      refresh_token: refreshToken,
    }),
  logOut: () => instance.post("auth/logout"),
  createUser: (user: FormTypeCreateUser) =>
    instance.post(
      "auth/sign-up",
      {
        name: user.name,
        password: user.password,
        age: user.age,
        email: user.email,
        city: user.city,
        file: user.file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    ),
};

export const userService = {
  updateUserData: (user: FormTypeForUpdate) =>
    instance.patch("users", {
      ...user,
    }),
};
