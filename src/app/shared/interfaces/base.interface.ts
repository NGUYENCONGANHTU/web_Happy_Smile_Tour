export interface BreadcrumbItem {
  label: string;
  url: string;
}

export interface ResponseBase<T> {
  data: T;
  message: string;
}

export interface ResponseBaseList<T> {
  data: T[];
  message: string;
}

export interface ResponseBasePage<T> {
  data: {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    page: number;
    size: number;
    sort: any[];
    totalElements: number;
    totalPages: number;
  };
  message: string;
}

export interface OptionItem<T = any> {
  label: string;
  value: T;
}

export interface FileResDTO {
  id: number;
  documentType?: any;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  storagePath?: string;
}

export interface CommentDTO {
  id: number;
  employeeCode: string;
  content: string;
  createdDate: string;
  avatarUrl: string;
  likeCount: number;
  likedByMe: boolean;
  replies: CommentDTO[];
}

export interface TableRequestParams<F = any, _S = any> {
  keyword?: string;
  filter?: F;
  page?: number;
  size?: number;
}
