import { Mutex } from "async-mutex";
import axios from "axios";
import { createBrowserHistory } from "history";

import {
  deleteTokens,
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
  setLocalRefreshToken,
  // setLocalAccessToken,
  // setLocalRefreshToken,
} from "../../common/localStorage/local.storege";
import { authService } from "../auth.service";

const base_url = "http://localhost:3005";
const mutex = new Mutex();
export const instance = axios.create({
  baseURL: base_url,
});

const history = createBrowserHistory();
instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
instance.interceptors.response.use(
  (configs) => {
    return configs;
  },
  async (error) => {
    const refresh = getLocalRefreshToken();

    if (error.response?.status === 401 && refresh && !isRefreshing) {
      isRefreshing = true;

      try {
        const tokens = await authService.refresh(refresh);

        if (tokens) {
          setLocalAccessToken(tokens.data.accessToken);
          setLocalRefreshToken(tokens.data.refreshToken);
        }
      } catch (e) {
        deleteTokens();
        // history.replace('/login?expSession=true')
      }
      isRefreshing = false;

      return instance(error.config);
    }
    return Promise.reject(error);
  },
);

export { history };
