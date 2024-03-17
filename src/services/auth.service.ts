import { z } from "zod";

import { ITokensForRefresh, ITokensPair } from "../common/types/types";
import { FormType } from "../components/loginComponent/loginComponent";
import { FormTypeCreateUserNew } from "../components/myAccountForm/CreateAccountNew";
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
  forgotPassword: (email: string) =>
    instance.post("auth/recovery_password", {
      email,
    }),
  createUser: (user: FormTypeCreateUserNew) =>
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
