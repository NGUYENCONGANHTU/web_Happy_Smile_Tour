import { LanguageResDTO } from '../../../shared/interfaces/shared-data.interface';
import { FileResDTO } from '../../../core/interfaces/base.interface';

export interface VisaServiceReqDTO {
  name: string;
  bannerTitle: string;
  phone: string;
  serviceTitle: string;
  serviceContent: string;
  workflow: string;
  image: Record<string, any>;
}

export interface VisaServiceTransReqDTO {
  visaServiceId: number;
  languageCode: string;
  name: string;
  bannerTitle: string;
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
  phone: string;
  serviceTitle: string;
  serviceContent: string;
  workflow: string;
  image: FileResDTO;
  visaProcesses: VisaProcessResDTO[];
  created: boolean;
}

export interface VisaProcessResDTO {
  id: number;
  visaProcessId: number;
  language: LanguageResDTO;
  title: string;
  description: string;
  visaServiceId: string;
  created: boolean;
}

export interface VisaProcessReqDTO {
  id: number;
  title: string;
  description: string;
  visaServiceId: number;
}

export interface VisaProcessTransReqDTO {
  id: number;
  visaProcessId: number;
  languageCode: string;
  title: string;
  description: string;
}
