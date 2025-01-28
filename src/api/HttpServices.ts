import { request } from "./HttpUtils";
import {
  EventParams,
  ListParams,
  MasjidParams,
  NewsParams,
  PrayersParams,
  ProgramParams,
} from "./types";

export const setMasjid = (cred: FormData) => {
  return request({
    url: "masjid/create",
    method: "POST",
    data: cred,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};
export const listMasjids = (cred: ListParams) => {
  return request({
    url: `masjid/list?page=${cred.page}&count=${cred.count}`,
    method: "GET",
  });
};
export const editMasjid = (
  cred: MasjidParams | FormData,
  requestType: "multipart/form-data" | "application/json"
) => {
  console.log("cred:", cred, requestType);
  var formData = new FormData();
  if (requestType === "multipart/form-data") {
    Object.entries(cred).forEach(([key, value]: any) =>
      formData.append(key, value)
    );
  }
  return request({
    url: "masjid/edit",
    method: "POST",
    data: requestType === "multipart/form-data" ? formData : cred,
    config: {
      headers: {
        "Content-Type": requestType,
      },
    },
  });
};
export const deleteMasjid = (id?: number) => {
  return request({
    url: `masjid/delete/${id}`,
    method: "DELETE",
  });
};
export const setPrayers = (cred: PrayersParams) => {
  return request({
    url: `prayers/create`,
    method: "POST",
    data: cred,
  });
};
export const listPrayers = (cred: ListParams) => {
  return request({
    url: `prayers/list?page=${cred.page}&count=${cred.count}`,
    method: "GET",
  });
};
export const editPrayers = (cred: PrayersParams) => {
  return request({
    url: "prayers/edit",
    method: "POST",
    data: cred,
  });
};
export const deletePrayers = (id?: number) => {
  return request({
    url: `prayers/delete/${id}`,
    method: "DELETE",
  });
};
export const setNews = (cred: NewsParams) => {
  return request({
    url: `news/create`,
    method: "POST",
    data: cred,
  });
};
export const listNews = (cred: ListParams) => {
  return request({
    url: `news/list?page=${cred.page}&count=${cred.count}`,
    method: "GET",
  });
};
export const editNews = (cred: NewsParams) => {
  return request({
    url: "news/edit",
    method: "POST",
    data: cred,
  });
};
export const deleteNews = (id?: number) => {
  return request({
    url: `news/delete/${id}`,
    method: "DELETE",
  });
};
export const setEvent = (cred: FormData) => {
  return request({
    url: `event/create`,
    method: "POST",
    data: cred,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};
export const listEvents = (cred: ListParams) => {
  return request({
    url: `event/list?page=${cred.page}&count=${cred.count}`,
    method: "GET",
  });
};
export const editEvent = (
  cred: EventParams | FormData,
  requestType: "multipart/form-data" | "application/json"
) => {
  var formData = new FormData();
  if (requestType === "multipart/form-data") {
    Object.entries(cred).forEach(([key, value]: any) =>
      formData.append(key, value)
    );
  }
  return request({
    url: "event/edit",
    method: "POST",
    data: requestType === "multipart/form-data" ? formData : cred,
    config: {
      headers: {
        "Content-Type": requestType,
      },
    },
  });
};
export const deleteEvent = (id?: number) => {
  return request({
    url: `event/delete/${id}`,
    method: "DELETE",
  });
};

export const setProgram = (cred: FormData) => {
  return request({
    url: `program/create`,
    method: "POST",
    data: cred,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};
export const listPrograms = (cred: ListParams) => {
  return request({
    url: `program/list?page=${cred.page}&count=${cred.count}`,
    method: "GET",
  });
};
export const editProgram = (
  cred: ProgramParams | FormData,
  requestType: "multipart/form-data" | "application/json"
) => {
  var formData = new FormData();
  if (requestType === "multipart/form-data") {
    Object.entries(cred).forEach(([key, value]: any) =>
      formData.append(key, value)
    );
  }
  return request({
    url: "program/edit",
    method: "POST",
    data: requestType === "multipart/form-data" ? formData : cred,
    config: {
      headers: {
        "Content-Type": requestType,
      },
    },
  });
};
export const deleteProgram = (id?: number) => {
  return request({
    url: `program/delete/${id}`,
    method: "DELETE",
  });
};
