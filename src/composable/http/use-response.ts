import { ServiceResponse } from '@/entities/paging/paging-request';
import i18n from '@/i18n';
import { message } from 'ant-design-vue';
import { AxiosError, AxiosResponse } from 'axios';

const t = i18n.global.t;

export function check(res?: AxiosResponse<any, any>) {
  let isSuccess = false;
  let data = res?.data as ServiceResponse;
  switch (res?.status) {
    case 400:
    case 401:
    case 402:
    case 403:
    case 404:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      message.error(t('i18nCommon.ErrorOccur'));
      break;
    case 200:
    case 201:
      isSuccess = data.IsSuccess ?? false;
      break;
  }
  return { isSuccess, data };
}

export function handleError(err: AxiosError<any, any>) {
  if (err?.response) {
    return err.response;
  } else {
    if (err?.code == 'ERR_NETWORK') err.response = { status: 500 } as any;
  }

  return err.response;
}
