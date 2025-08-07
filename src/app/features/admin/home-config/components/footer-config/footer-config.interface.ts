import { LanguageResDTO } from '../../../../../shared/interfaces/shared-data.interface';

export interface FooterResDTO {
  id: number;
  footerId: number;
  language?: LanguageResDTO;
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
  created: boolean;
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

export interface FooterTransReqDTO {
  footerId: number;
  languageCode: string;
  name: string;
  position: string;
  company: string;
  address: string;
}
