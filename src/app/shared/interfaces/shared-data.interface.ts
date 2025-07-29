import { FileResDTO } from '../../core/interfaces/base.interface';

export interface LanguageResDTO {
  id: number;
  name: string;
  code: string;
  responseDocumentDTO: FileResDTO;
}
