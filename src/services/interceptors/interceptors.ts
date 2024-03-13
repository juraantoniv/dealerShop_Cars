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
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If another request is already refreshing the token, wait and retry the original request
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              const tokens = await authService.refresh(getLocalRefreshToken());
              if (tokens) {
                setLocalAccessToken(tokens.data.accessToken);
                setLocalRefreshToken(tokens.data.refreshToken);
                originalRequest.headers["Authorization"] =
                  "Bearer " + tokens.data.accessToken;
                resolve(instance(originalRequest));
              }
            } catch (refreshError) {
              deleteTokens();
              await Promise.reject(refreshError);
              // Redirect to login or handle as necessary
            }
          }, 1000); // Wait 1 second before retrying
        });
      }

      // Set a flag to indicate that the request is being retried
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await authService.refresh(getLocalRefreshToken());
        if (tokens) {
          setLocalAccessToken(tokens.data.accessToken);
          setLocalRefreshToken(tokens.data.refreshToken);
          originalRequest.headers["Authorization"] =
            "Bearer " + tokens.data.accessToken;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        deleteTokens();
        // Redirect to login or handle as necessary
        // history.replace('/login?expSession=true')
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    // For other errors, reject the request
    return Promise.reject(error);
  },
);

export { history };
