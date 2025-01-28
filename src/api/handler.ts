import {AxiosError, AxiosRequestConfig} from 'axios';

export const errorHandler = (error: AxiosError): AxiosError => {
  return error;
};

export const configHandler = (config: {config: AxiosRequestConfig}): string => {
  let tempConfig = config.config;
  let requestDetails = `[${tempConfig.method}, /${tempConfig.url}]`;

  if (tempConfig.data) {
    return `data: ${requestDetails} ${tempConfig.data}`;
  } else if (tempConfig.params) {
    return `params: ${requestDetails} ${JSON.stringify(tempConfig.params)}`;
  } else {
    return requestDetails;
  }
};
