export interface TourResDTO {
  id?: number;
  tourId?: number;
  language?: LanguageResponse;
  title?: string;
  star?: number;
  numberComment?: number;
  destination?: string[];
  originalPrice?: number;
  discount?: number;
  finalPrice?: number;
  stayDate?: string;
  location?: LocationResponse;
  startingPoints?: LocationResponse[];
  highlight?: string;
  service?: string;
  nonService?: string;
  regulation?: string;
  note?: string;
  imageUrl: string[];
}

interface LanguageResponse {
  id?: number;
  code?: string;
  name?: string;
}

interface LocationResponse {
  id?: number;
  name?: string;
  country?: string;
  province?: string;
}

export enum TourType {
  DOMESTIC = 'DOMESTIC',
  FOREIGN = 'FOREIGN',
  PRIVATE = 'PRIVATE',
}

export interface CreateTourReqDTO {
  title: string; // Tên tour (bắt buộc)
  star: number; // Số sao (bắt buộc)
  destination: string[]; // Danh sách điểm đến (bắt buộc)
  originalPrice: number; // Giá gốc (bắt buộc)
  discount: number; // Giảm giá (bắt buộc)
  finalPrice: number; // Giá sau khi giảm (bắt buộc)
  stayDate: string; // Thời gian ở (VD: "3N2Đ") (bắt buộc)
  locationId: number; // ID điểm khởi hành chính (bắt buộc)
  startingPointIds: number[]; // Danh sách điểm xuất phát phụ (bắt buộc)
  highlight: string; // Nội dung nổi bật (bắt buộc)
  service: string; // Dịch vụ bao gồm (bắt buộc)
  nonService: string; // Dịch vụ không bao gồm (bắt buộc)
  regulation: string; // Chính sách hủy tour (bắt buộc)
  note: string; // Lưu ý thêm (bắt buộc)
  images: File[]; // Danh sách ảnh (bắt buộc)
}

export interface TourPriceResDTO {
  id: number;
  tourPriceId: number;
  language: string;
  name?: string;
  age?: string;
  price?: number;
  tourId: number;
}

export interface TourDiscountResDTO {
  id: number;
  tourDiscountId: number;
  language: string;
  name?: string;
  description?: string;
  price?: number;
  condition?: string;
  tourId: number;
}

export interface TourSurchargeResDTO {
  id: number;
  tourSurchargeId: number;
  language: string;
  name?: string;
  price?: number;
  apply?: string;
  tourId: number;
}

export interface TourScheduleResDTO {
  id: number;
  tourScheduleId: number;
  language: string;
  title: string;
  description: string;
  tourId: number;
}

type LocationType = 'DOMESTIC' | 'INTERNATIONAL';

export interface LocationResDTO {
  id: number;
  locationId: number;
  language?: string;
  name?: string;
  locationType?: LocationType;
}

export interface TourPriceReqDTO {
  id: number;
  name: string;
  age: string;
  price: number;
  tourId: number;
}

export interface TourDiscountReqDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  condition: number;
  tourId: number;
}

export interface TourSurchargeReqDTO {
  id: number;
  name: string;
  price: number;
  apply: string;
  tourId: number;
}

export interface TourScheduleReqDTO {
  id: number;
  title: string;
  description: string;
  tourId: string;
}
