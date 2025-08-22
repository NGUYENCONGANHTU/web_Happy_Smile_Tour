import { LanguageResDTO } from '../../../../../shared/interfaces/shared-data.interface';
import { FileResDTO } from '../../../../../core/interfaces/base.interface';

export interface IntroResDTO {
  created: boolean;
  description: string;
  id: number;
  introId: number;
  introType: 'MAIN' | 'INTRO';
  language: LanguageResDTO;
  title: string;
}

export interface IntroReqDTO {
  title: string;
  description: string;
  introType: 'MAIN' | 'INTRO';
}

export interface IntroTransReqDTO {
  introId: number;
  languageCode: string;
  title: string;
  description: string;
}

export interface IntroTitleResDTO {
  id: number;
  introTitleId: number;
  language: LanguageResDTO;
  title: string;
  created: boolean;
}

export interface IntroTitleReqDTO {
  title: string;
}

export interface IntroTitleTransReqDTO {
  introTitleId: number;
  languageCode: string;
  title: string;
}

export interface AdvertisementReqDTO {
  title: string;
  image: File;
}

export interface AdvertisementTransReqDTO {
  advertiseId: number;
  languageCode: string;
  title: string;
}

export interface AdvertisementResDTO {
  id: number;
  advertiseId: number;
  language: LanguageResDTO;
  title: string;
  image: FileResDTO;
  created: boolean;
}
