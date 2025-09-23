import { Component, inject, OnInit } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PartnerConfigService } from './partner-config.service';
import { parseToNzUploadFile } from '../../../../../shared/utils/helpers/common.helper';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-partner-config',
  templateUrl: 'partner-config.component.html',
  imports: [
    NzUploadComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzIconModule,
    NzButtonModule,
  ],
  standalone: true,
})
export class PartnerConfigComponent implements OnInit {
  partnerService = inject(PartnerConfigService);
  message = inject(NzMessageService);
  fetching = false;

  fileList: NzUploadFile[] = [];

  ngOnInit() {
    this.fetchPartners();
  }

  fetchPartners() {
    this.fetching = true;
    this.partnerService.getPartners().subscribe({
      next: res => {
        if (res.data.length) {
          this.fileList = [
            ...res.data[0].images.map(image =>
              parseToNzUploadFile(image.storagePath, image.id)
            ),
          ];
        }
      },
    });
  }

  onSubmit() {
    const formData = new FormData();
    this.fileList.forEach(file => {
      if (file?.uid) {
        formData.append('idsFile', file.uid);
      } else {
        formData.append('image', file as unknown as File);
      }
    });

    this.partnerService.updatePartners(formData).subscribe({
      next: () => {
        this.message.success('Cập nhật thành công');
      },
      error: () => {
        this.message.error('Cập nhật không thành công');
      },
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    this.getBase64(file as any, (img: string) => {
      file.thumbUrl = img; // hiện preview
      this.fileList = [...this.fileList, file];
    });
    return false; // ngăn upload tự động
  };

  handleRemove = (file: NzUploadFile) => {
    this.fileList = this.fileList.filter(f => f.uid !== file.uid);
    return true;
  };

  // convert sang base64 để preview
  getBase64(file: File, callback: (img: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(file);
  }
  protected readonly selectedLanguage = ORIGINAL_LANGUAGE;
}
