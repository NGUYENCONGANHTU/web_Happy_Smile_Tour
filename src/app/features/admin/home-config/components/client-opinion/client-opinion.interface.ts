import { FileResDTO } from '../../../../../core/interfaces/base.interface';

export interface ClientOpinionResDTO {
  id: number;
  name: string;
  description: string;
  content: string;
  star: number;
  image: FileResDTO;
}

export interface ClientOpinionReqDTO {
  name: string;
  description: string;
  content: string;
  star: number;
  image: File;
}
