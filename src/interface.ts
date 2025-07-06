/* ====================  Biểu ngữ trang chủ ==================== */
export interface HomeBannerReqDTO {
  title: string;
  description: string;
  imageUrl: string[];
}
export interface HomeBannerResDTO {
  id: number;
  title: string;
  description: string;
  imageUrl: string[];
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
  type: LocationType;
}
export interface LocationResDTO {
  id: number;
  name: string;
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
  destination: string[];
  originalPrice: number;
  discount: number;
  finalPrice: number;
  stayDate: string;
  location: LocationResDTO;
  startingPoint: string;
  highlight: string;
  schedule: string;
  priceTable: string;
  service: string;
  imageUrl: string[];
}
export interface FeatureResDTO {
  id: number;
  title: string;
  star: number;
  numberComment: number;
  destination: string[];
  originalPrice: number;
  discount: number;
  finalPrice: number;
  stayDate: string;
  location: LocationResDTO;
  startingPoint: string;
  highlight: string;
  schedule: string;
  priceTable: string;
  service: string;
  imageUrl: string[];
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
/* ==================== TRANG LIÊN HỆ  ==================== */
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
/* ==================== Liên hệ trong page Dịch vụ  ==================== */
export interface ContactVisaReqDTO {
  name: string;
  email: string;
  phone: string;
  message: string;
}
export interface ContactVisaResDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}
