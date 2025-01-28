import { AxiosRequestConfig, CancelTokenSource } from "axios";

// Define supported HTTP methods
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Define the request function parameters
export interface RequestParams {
  url: string;
  method: HttpMethod;
  data?: Record<string, any>;
  config?: AxiosRequestConfig;
  cancelToken?: CancelTokenSource;
}
export type MasjidParams = {
  masjidId: string;
  photo: string | File | null;
  name: string;
  city: string;
  state: string;
  address: string;
  website?: string;
  timezone: string;
};
export type ListParams = {
  page: number;
  count: number;
};

export type PrayersParams = {
  masjidId: string | number;
  date: string;
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};
