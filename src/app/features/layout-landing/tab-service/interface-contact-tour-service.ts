export interface TourServiceReqDTO {
  name: string;
  email: string;
  phone: string;
  message: string;
  contactType: ContactType;
}
export interface TourServiceResDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  contactType: ContactType;
}
export enum ContactType {
  'TOUR',
  'VISA',
}
