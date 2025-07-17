/* ==================== BẢNG GIẢM GIÁ   ==================== */
export interface TourDiscountReqDTO {
  name: string;
  description: string;
  price: number;
  condition: string;
  tourId: number;
}
export interface TourDiscountResDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  condition: string;
  tourId: number;
}

/* ==================== BẢNG GIÁ  ==================== */
export interface TourPriceReqDTO {
  name: string;
  age: string;
  price: number;
  tourId: number;
}
export interface TourPriceResDTO {
  id: number;
  name: string;
  age: string;
  price: number;
  tourId: number;
}

/* ==================== BẢNG PHỤ THU  ==================== */
export interface TourSurchargeReqDTO {
  name: string;
  price: number;
  apply: string;
  tourId: number;
}
export interface TourSurchargeResDTO {
  id: number;
  name: string;
  price: number;
  apply: string;
  tourId: number;
}
