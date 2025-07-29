import { FileResDTO } from '../../../core/interfaces/base.interface';

export interface BlogResDTO {
  title?: string;
  content?: string;
  image?: FileResDTO;
}

export interface BlogReqDTO {
  title: string;
  content: string;
  image: File;
}
