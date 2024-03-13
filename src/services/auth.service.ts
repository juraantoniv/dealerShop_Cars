import { ITokensForRefresh, ITokensPair } from "../common/types/types";
import { FormType } from "../components/loginComponent/loginComponent";
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
};
