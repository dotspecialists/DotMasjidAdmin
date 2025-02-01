import { WeekDaysProps } from "@/utils/types";
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
  q?: string;
  fields?: string;
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
export type PrayersByCSVParams = {
  masjidId: string | number;
  csv: File;
};
export type NewsParams = {
  masjidId: number | string;
  date: string;
  newsTitle: string;
  newsDescription: string;
  newsLink: string;
};
export type EventParams = {
  photo?: string | File | null;
  masjidId: number | string;
  eventDate: string;
  eventLocation: string;
  eventDescription: string;
  eventCost: number;
  registerationLink?: string;
};
export interface ProgramParams extends WeekDaysProps {
  photo?: string | File | null;
  masjidId: string | number;
  name: string;
  description: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
}
