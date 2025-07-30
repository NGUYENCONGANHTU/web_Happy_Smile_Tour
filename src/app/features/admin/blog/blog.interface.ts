import { FileResDTO } from '../../../core/interfaces/base.interface';
import { LanguageResDTO } from '../../../shared/interfaces/shared-data.interface';

export interface BlogResDTO {
  id?: number;
  travelGuideId?: number;
  language?: LanguageResDTO;
  title?: string;
  content?: string;
  image?: FileResDTO;
  modifiedDate?: string;
}

export interface BlogReqDTO {
  title: string;
  content: string;
  image: File;
}

export interface BlogTransResDTO {
  id?: number;
  travelGuideId?: number;
  language?: LanguageResDTO;
  title?: string;
  content?: string;
  image?: FileResDTO;
  modifiedDate?: string;
}

export interface BlogTransReqDTO {
  travelGuideId: string | number;
  languageId: string | number;
  title: string;
  content: string;
}
