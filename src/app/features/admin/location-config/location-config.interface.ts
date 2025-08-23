import {LanguageResDTO} from '../../../shared/interfaces/shared-data.interface';
import {LocationType} from '../../../../interface';

export interface LocationResDTO {
  id: number;
  locationId: number;
  language: LanguageResDTO;
  name: string;
  locationType: LocationType;
  created: boolean;
}

export interface LocationReqDTO {
  name: string;
  locationType: LocationType;
}

export interface LocationTransReqDTO {
  locationId: number;
  languageCode: string;
  name: string;
}
