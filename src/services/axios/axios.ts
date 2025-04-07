import axios, { AxiosRequestConfig, ResponseType, AxiosResponse } from "axios";

import {
  addTokenToAxiosConfig,
  handleErrorOnRequest,
} from "@/utils/axiosUtils";

export const axiosInstance = axios.create({
  baseURL: (window as any)?._env_?.VITE_BASE_URL,
  timeout: 5 * 60 * 1000,
});

axiosInstance.interceptors.request.use((config) => {
  const response = addTokenToAxiosConfig(config);
  return response;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    handleErrorOnRequest(error);
    throw error;
  }
);

export async function sendRequest<T>(
  url: string,
  data = {},
  responseType?: ResponseType
): Promise<AxiosResponse<T>> {
  try {
    const response = await axiosInstance.get(url, {
      params: { ...data },
      responseType,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
}

export async function createRequest<T>(
  url: string,
  data = {},
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
}

export async function updateRequest<T>(
  url: string,
  data = {},
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.put(url, data, config);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
}

export async function deleteRequest<T>(url: string, data = {}): Promise<T> {
  try {
    const response = await axiosInstance.delete(url, data);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
}
