import { DocumentResDTO } from '../../../../interface';

export interface AdvertiseReqDTO {
  title: string;
  responseDocumentDTO: DocumentResDTO;
}
export interface AdvertiseResDTO {
  id: number;
  title: string;
  responseDocumentDTO: DocumentResDTO;
}
