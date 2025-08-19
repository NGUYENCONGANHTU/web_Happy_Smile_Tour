/* ====================  Biểu ngữ trang chủ ==================== */
import { ScheduleResDTO } from './app/features/layout-landing/tab-tour-foreign-detail/schedule/schedule-interface';
import {
  TourDiscountResDTO,
  TourPriceResDTO,
  TourSurchargeResDTO,
} from './app/features/layout-landing/tab-tour-foreign-detail/price-list/interface-tour-price';
import { IRating } from './app/shared/components/review-summary/review-summary.component';

export interface BannerReqDTO {
  homeBannerId: number;
  language: LanguageResDTO;
  title: string;
  description: string;
  bannerType: BannerType;
  images: DocumentResDTO[];
}
export interface BannerResDTO {
  id: number;
  homeBannerId: number;
  language: LanguageResDTO;
  title: string;
  description: string;
  bannerType: BannerType;
  images: DocumentResDTO[];
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
/* ==================== Bình luận ==================== */
export interface CommentReqDTO {
  title: string;
  image: DocumentResDTO;
  description: string;
  content: string;
  star: number;
}
export interface CommentResDTO {
  id: number;
  title: string;
  image: DocumentResDTO;
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
  tourId: number;
  title: string;
  averageRate: number;
  numberComment: number;
  originalPrice: string;
  currencyUnit: string;
  discount: number;
  finalPrice: string;
  stayDate: string;
  location: LocationResDTO;
  startingPoints: LocationResDTO[];
  highlight: string;
  service: string;
  nonService: string;
  regulation: string;
  note: string;
  images: DocumentResDTO[];
  tourSchedules: ScheduleResDTO[];
  tourPrices: TourPriceResDTO[];
  tourSurcharges: TourSurchargeResDTO[];
  tourDiscounts: TourDiscountResDTO[];
  tourComments: TourCommentDetailResDTO[];
  totalReviews: number;
  ratingList: RatingResDTO[];
}
export interface FeatureResDTO {
  id: number;
  tourId: number;
  title: string;
  averageRate: number;
  numberComment: number;
  originalPrice: string;
  currencyUnit: string;
  discount: number;
  finalPrice: string;
  stayDate: string;
  location: LocationResDTO;
  startingPoints: LocationResDTO[];
  highlight: string;
  service: string;
  nonService: string;
  regulation: string;
  note: string;
  images: DocumentResDTO[];
  tourSchedules: ScheduleResDTO[];
  tourPrices: TourPriceResDTO[];
  tourSurcharges: TourSurchargeResDTO[];
  tourDiscounts: TourDiscountResDTO[];
  tourComments: TourCommentDetailResDTO[];
  totalReviews: number;
  ratingList: RatingResDTO[];
}
export interface RatingReqDTO {
  star: number;
  percent: number;
  count: number;
  averageRate?: number;
  ratingList?: IRating[];
  totalReviews?: number;
}
export interface RatingResDTO {
  id: number;
  star: number;
  percent: number;
  count: number;
}

/* ==================== CẨM NANG TIN TỨC ==================== */
export interface TravelGuideReqDTO {
  title: string;
  content: string;
  image: DocumentResDTO;
}
export interface TravelGuideResDTO {
  id: number;
  travelGuideId: number;
  title: string;
  content: string;
  image: DocumentResDTO;
  modifiedDate: Date;
}
/* ==================== COMMENT TOUR ==================== */
export interface CommentFeedbackReqDTO {
  name: string;
  description: string;
  content: string;
  start: number;
  image: DocumentResDTO;
}
export interface CommentFeedbackResDTO {
  id: number;
  name: string;
  description: string;
  content: string;
  start: number;
  image: DocumentResDTO;
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
  status: ContactStatus;
  budget: string;
  location: string;
  message: string;
  contactType: ContactType;
}
export interface ContactPrivateTourResDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  number_of_people: string;
  expected_date: string;
  status: ContactStatus;
  budget: string;
  location: string;
  message: string;
  contactType: ContactType;
}
export enum ContactStatus {
  'NEW',
  'PROCESSING',
  'PROCESSED',
}
export enum ContactType {
  'TOUR',
  'VISA',
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
}

/* ==================== ĐÁNH GIÁ CHI TIẾT TOUR  ==================== */

export interface TourCommentDetailReqDTO {
  name?: string;
  rate?: number;
  content?: string;
  tags?: string[];
  imageUrl?: string;
  time?: Date;
  tourId?: number;
}
export interface TourCommentDetailResDTO {
  id: number;
  tourId: number;
  name?: string;
  rate?: number;
  time?: string;
  tags?: string[];
  content?: string;
  imageUrl?: string;
}
/* ==================== LANGUAGE  ==================== */
export interface LanguageReqDTO {
  name: string;
  code: string;
  image: DocumentResDTO;
}
export interface LanguageResDTO {
  id: number;
  name: string;
  code: string;
  image: DocumentResDTO;
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
  name: string;
  bannerTitle: string;
  image: DocumentResDTO;
  phone: string;
  serviceTitle: string;
  serviceContent: string;
  workflow: string;
  visaProcesses: VisaProcessResDTO[];
}

export interface VisaServiceResDTO {
  id: number;
  visaServiceId: number;
  name: string;
  bannerTitle: string;
  image: DocumentResDTO;
  phone: string;
  serviceTitle: string;
  serviceContent: string;
  workflow: string;
  visaProcesses: VisaProcessResDTO[];
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

/* ==================== Partner  ==================== */
export interface PartnerReqDTO {
  images: DocumentResDTO[];
}

export interface PartnerResDTO {
  id: number;
  images: DocumentResDTO[];
}
export interface FooterReqDTO {
  name?: string;
  position?: string;
  company?: string;
  address?: string;
  taxCode?: string;
  licenseNumber?: string;
  website?: string;
  email?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
}
export interface FooterResDTO {
  id: number;
  name?: string;
  position?: string;
  company?: string;
  address?: string;
  taxCode?: string;
  licenseNumber?: string;
  website?: string;
  email?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
}
