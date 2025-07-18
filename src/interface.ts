/* ====================  Biểu ngữ trang chủ ==================== */
import { ScheduleResDTO } from './app/features/layout-landing/tab-tour-foreign-detail/schedule/schedule-interface';
import {
  TourDiscountResDTO,
  TourPriceResDTO,
  TourSurchargeResDTO,
} from './app/features/layout-landing/tab-tour-foreign-detail/price-list/interface-tour-price';

export interface HomeBannerReqDTO {
  homeBannerId: number;
  language: LanguageResDTO;
  title: string;
  description: string;
  bannerType: BannerType;
  documentDTOS: DocumentResDTO[];
}
export interface HomeBannerResDTO {
  id: number;
  homeBannerId: number;
  language: LanguageResDTO;
  title: string;
  description: string;
  bannerType: BannerType;
  documentDTOS: DocumentResDTO[];
}
export enum BannerType {
  HOME = 'HOME',
  INTRO = 'INTRO',
  CONTACT = 'CONTACT',
  SERVICE = 'SERVICE',
}

// ==================== UPLOAD ẢNH ======================
export interface DocumentReqDTO {
  id: number;
  fileName: string;
  fileType: string;
  documentType: string;
  fileSize: number;
  storagePath: string;
}
export interface DocumentResDTO {
  id: number;
  fileName: string;
  fileType: string;
  documentType: string;
  fileSize: number;
  storagePath: string;
}

/* ====================  Các tiêu đề của Trang chủ ==================== */
export interface HomeTitleReqDTO {
  title: string;
  homeTitleType: HomeTitleType;
}
export interface HomeTitleResDTO {
  id: number;
  title: string;
  homeTitleType: HomeTitleType;
}
export enum HomeTitleType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}
/* ==================== Cẩm nang du lịch ==================== */
export interface TravelGuideReqDTO {
  title: string;
  image: string;
  description: string;
  content: string;
}
export interface TravelGuideResDTO {
  id: number;
  title: string;
  homeTitleType: string;
  content: string;
}
/* ==================== Bình luận ==================== */
export interface CommentReqDTO {
  title: string;
  image: string;
  description: string;
  content: string;
  star: number;
}
export interface CommentResDTO {
  id: number;
  title: string;
  image: string;
  description: string;
  content: string;
  star: number;
}
/* ==================== Địa điểm ==================== */
export interface LocationReqDTO {
  name: string;
  locationId: number;
  type: LocationType;
}
export interface LocationResDTO {
  id: number;
  name: string;
  locationId: number;
  type: LocationType;
}
export enum LocationType {
  DOMESTIC = 'DOMESTIC',
  INTERNATINAL = 'INTERNATINAL',
}

/* ==================== Các hoạt động nổi bật ==================== */
export interface FeatureReqDTO {
  title: string;
  star: number;
  numberComment: number;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  stayDate: string;
  location: LocationResDTO;
  startingPoints: LocationResDTO[];
  highlight: string;
  service: string;
  nonService: string;
  regulation: string;
  note: string;
  imageUrl: string[];
  tourSchedules: ScheduleResDTO[];
  tourPrices: TourPriceResDTO[];
  tourSurcharges: TourSurchargeResDTO[];
  tourDiscounts: TourDiscountResDTO[];
  tourComments: TourCommentDetailResDTO[];
}
export interface FeatureResDTO {
  id: number;
  title: string;
  star: number;
  numberComment: number;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  stayDate: string;
  location: LocationResDTO;
  startingPoints: LocationResDTO[];
  highlight: string;
  service: string;
  nonService: string;
  regulation: string;
  note: string;
  imageUrl: string[];
  tourSchedules: ScheduleResDTO[];
  tourPrices: TourPriceResDTO[];
  tourSurcharges: TourSurchargeResDTO[];
  tourDiscounts: TourDiscountResDTO[];
  tourComments: TourCommentDetailResDTO[];
}
/* ==================== Tour nước ngoài ==================== */
/* ==================== CẨM NANG TIN TỨC ==================== */
export interface TravelGuideReqDTO {
  title: string;
  content: string;
  image: string;
}
export interface TravelGuideResDTO {
  id: number;
  title: string;
  content: string;
  image: string;
}
/* ==================== COMMENT TOUR ==================== */
export interface CommentFeedbackReqDTO {
  name: string;
  description: string;
  content: string;
  start: number;
  image: string;
}
export interface CommentFeedbackResDTO {
  id: number;
  name: string;
  description: string;
  content: string;
  start: number;
  image: string;
}
/* ====================  PAGE GIỚI THIỆU  ==================== */
export interface IntroducePageReqDTO {
  title: string;
  description: string;
  type: Introduce;
}
export interface IntroducePageResDTO {
  id: number;
  title: string;
  description: string;
  type: Introduce;
}

export enum Introduce {
  BANNER,
  HIGHLIGHT,
  MAIN,
}
// SỐ LIỆU THỐNG KÊ TRANG GIỚI THIỆU
export interface IntroduceTitleReqDTO {
  title: string;
  type: IntroduceTitle;
}
export interface IntroduceTitleResDTO {
  id: number;
  title: string;
  type: IntroduceTitle;
}
export enum IntroduceTitle {
  TITLE,
  STATISTICAL,
}
/* ====================  TOUR ĐOÀN RIÊNG  ==================== */
export interface PrivateTourReqDTO {
  title: string;
  description: string;
  type: PrivateTour;
}
export interface PrivateTourResDTO {
  id: number;
  title: string;
  description: string;
  type: PrivateTour;
}
export enum PrivateTour {
  TOUR,
  VISA,
}
/* ====================  LIÊN HỆ TRONG TOUR ĐOÀN RIÊNG  ==================== */
export interface ContactPrivateTourReqDTO {
  name: string;
  email: string;
  phone: string;
  company: string;
  number_of_people: string;
  expected_date: string;
  budget: string;
  location: string;
  message: string;
}
export interface ContactPrivateTourResDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  number_of_people: string;
  expected_date: string;
  budget: string;
  location: string;
  message: string;
}
/* ==================== TRANG LIÊN HỆ   ==================== */
export interface ContactPageReqDTO {
  title: string;
  description: string;
  type: ContactPage;
}
export interface ContactPageResDTO {
  id: number;
  title: string;
  description: string;
  type: ContactPage;
}
export enum ContactPage {
  BANNER,
  ADDRESS,
  PHONE,
  EMAIL,
  FOOTER,
}

/* ==================== ĐÁNH GIÁ CHI TIẾT TOUR  ==================== */
export interface TourCommentDetailReqDTO {
  name: string;
  content: string;
  star: number;
}
export interface TourCommentDetailResDTO {
  id: number;
  name: string;
  content: string;
  star: number;
  tourId: number;
}
/* ==================== LANGUAGE  ==================== */
export interface LanguageReqDTO {
  name: string;
  code: string;
  flag: string;
}
export interface LanguageResDTO {
  id: number;
  name: string;
  code: string;
  flag: string;
}

/* ==================== LỊCH TRÌNH  ==================== */
export interface TourScheduleReqDTO {
  tourScheduleId: number;
  title: string;
  description: string;
  tourId: number;
}
export interface TourScheduleResDTO {
  id: number;
  tourScheduleId: number;
  title: string;
  description: string;
  tourId: number;
}
/* ==================== Menu Dịch Vụ  ==================== */
export interface VisaServiceReqDTO {
  visaServiceId: number;
  language: LanguageResDTO;
  name: string;
  bannerTitle: string;
  image: string;
  phone: string;
  serviceTitle: string;
  serviceContent: string;
  workflow: string;
}

export interface VisaServiceResDTO {
  id: number;
  visaServiceId: number;
  language: LanguageResDTO;
  name: string;
  bannerTitle: string;
  image: string;
  phone: string;
  serviceTitle: string;
  serviceContent: string;
  workflow: string;
}

/* ==================== Menu Dịch Vụ ( nội dung quy trình )  ==================== */
export interface VisaProcessReqDTO {
  visaServiceId: number;
  title: string;
  description: string;
}

export interface VisaProcessResDTO {
  id: number;
  visaServiceId: number;
  title: string;
  description: string;
}
