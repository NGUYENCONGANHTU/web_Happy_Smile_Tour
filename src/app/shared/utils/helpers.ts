import { HttpParams } from '@angular/common/http';
import { ResponseBasePage } from '../interface/base.interface';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

export function preParseString(value: any) {
  if (value !== undefined && value !== null) {
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    } else if (typeof value === 'object') {
      const tmp: Record<string, any> = {};
      Object.entries(value).forEach(([key, value]) => {
        tmp[key] = preParseString(value);
      });
      return JSON.stringify(tmp);
    }
  }
  return value;
}

export function createHttpParams(rawParams: Record<string, any>) {
  let res = new HttpParams();
  Object.entries(rawParams).forEach(([key, value]) => {
    if (value?.toString()) {
      res = res.set(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      );
    }
  });
  return res;
}

export function notNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export function getPageData(res: ResponseBasePage<any>) {
  return {
    page: res.data.page,
    pageSize: res.data.size,
    total: res.data.totalElements,
  };
}
