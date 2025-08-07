import { Component, inject, OnInit } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PartnerConfigService } from './partner-config.service';
import { parseToNzUploadFile } from '../../../../../shared/utils/helpers';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';

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
    this.partnerService.updatePartners(formData).subscribe();
  }

  beforeUpload = (_file: NzUploadFile, fileList: NzUploadFile[]) => {
    this.fileList = [...this.fileList, ...fileList];
    return false;
  };
  protected readonly selectedLanguage = ORIGINAL_LANGUAGE;
}
