import { LanguageResDTO } from '../../../../../shared/interfaces/shared-data.interface';

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
