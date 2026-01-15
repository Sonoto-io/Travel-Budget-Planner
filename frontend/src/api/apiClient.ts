import axios, { type AxiosRequestConfig } from "axios";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "";

const BASE_URL = `${BACKEND_URL}/api`;
const isNative = Capacitor.isNativePlatform();

/**
 * Axios instance (web only)
 */
const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * Normalize CapacitorHttp response to Axios-like shape
 */
function normalize(res: any) {
  return {
    data: res.data,
    status: res.status,
    headers: res.headers,
  };
}

/**
 * Axios-like API client
 */
const api = {
  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    if (!isNative) {
      return axiosApi.get<T>(url, config);
    }

    const res = await CapacitorHttp.get({
      url: BASE_URL + url,
      headers: config?.headers as any,
      webFetchExtra: { credentials: "include" },
    });

    return normalize(res);
  },

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    if (!isNative) {
      return axiosApi.post<T>(url, data, config);
    }

    const res = await CapacitorHttp.post({
      url: BASE_URL + url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers as any),
      },
      webFetchExtra: { credentials: "include" },
    });

    return normalize(res);
  },

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    if (!isNative) {
      return axiosApi.put<T>(url, data, config);
    }

    const res = await CapacitorHttp.put({
      url: BASE_URL + url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers as any),
      },
      webFetchExtra: { credentials: "include" },
    });

    return normalize(res);
  },

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    if (!isNative) {
      return axiosApi.delete<T>(url, config);
    }

    const res = await CapacitorHttp.delete({
      url: BASE_URL + url,
      headers: config?.headers as any,
      webFetchExtra: { credentials: "include" },
    });

    return normalize(res);
  },
};

export default api;
