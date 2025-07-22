import { DocumentResDTO } from '../../../../interface';

/* ====================  Lấy tiêu đề của trang giới thiệu  ==================== */

export interface IntroduceTitlePageReqDTO {
  title: string;
  introTitleId: string;
}
export interface IntroduceTitlePageResDTO {
  id: number;
  introTitleId: string;
  title: string;
}
/* ====================   lấy nội dung của của văn bản giới thiệu và thống kê  ==================== */
export interface IntroducePageReqDTO {
  title: string;
  introTitleId: string;
  description: string;
  introType: IntroType;
}
export interface IntroducePageResDTO {
  id: number;
  introTitleId: string;
  title: string;
  description: string;
  introType: IntroType;
}
export enum IntroType {
  MAIN,
  STATISTICAL,
}

// Nội dung của các dịch vụ
export interface AdvertiseReqDTO {
  title: string;
  responseDocumentDTO: DocumentResDTO;
}
export interface AdvertiseResDTO {
  id: number;
  title: string;
  responseDocumentDTO: DocumentResDTO;
}
