import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { ValidationMessagePipe } from '../../../../../../../shared/pipes/validation.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BannerConfigService } from '../../banner-config.service';
import { ORIGINAL_LANGUAGE } from '../../../../../../../shared/constants/global.constant';
import { parseToNzUploadFile } from '../../../../../../../shared/utils/helpers/common.helper';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-banner-form',
  templateUrl: 'banner-form.component.html',
  standalone: true,
  imports: [
    NzColDirective,
    NzFormModule,
    NzIconModule,
    NzRowDirective,
    NzUploadModule,
    ValidationMessagePipe,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
  ],
})
export class BannerFormComponent implements OnChanges {
  @Input({ required: true }) type!: 'HOME' | 'INTRO' | 'CONTACT';
  @Input() langCode!: string;

  fb = inject(FormBuilder);
  bannerService = inject(BannerConfigService);
  modal = inject(NzModalService);

  submitting = false;

  previewImage: string | undefined = '';
  previewVisible = false;

  bannerForm: FormGroup = this.fb.group({
    id: [null],
    title: ['', Validators.required],
    description: ['', Validators.required],
    images: this.fb.array([]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['langCode']) {
      this.fetchBannerData();
    }
  }

  fetchBannerData() {
    this.bannerService
      .getBannerTransByType(this.type, this.langCode)
      .subscribe({
        next: res => {
          if (res.data.length) {
            this.bannerForm.patchValue(res.data[0]);
            this.fileList.clear();
            res.data[0].images.forEach(({ storagePath, id }) => {
              this.fileList.push(
                this.fb.control(parseToNzUploadFile(storagePath, id))
              );
            });
            if (!this.isOriginalLanguage) {
              this.fileList.disable();
            }
          }
        },
      });
  }

  onSubmit() {
    if (this.bannerForm.valid) {
      this.submitting = true;
      const formValues = this.bannerForm.value;
      if (this.isOriginalLanguage) {
        this.bannerService
          .updateBannerById(formValues?.id, formValues)
          .subscribe({
            next: _res => (this.submitting = false),
            error: () => (this.submitting = false),
          });
      } else {
        this.bannerService
          .updateBannerTransById(formValues?.id, formValues)
          .subscribe({
            next: _res => (this.submitting = false),
            error: () => (this.submitting = false),
          });
      }
    }
  }

  // 👉 cải tiến upload ảnh
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    this.getBase64(file as any, (img: string) => {
      file.thumbUrl = img;
      this.fileList.push(this.fb.control(file));
    });
    return false; // ngăn upload tự động
  };

  // helper đọc file base64
  private getBase64(file: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(file);
  }

  handlePreview = async (file: NzUploadFile) => {
    this.previewImage = file.url || (file.thumbUrl as string);
    this.previewVisible = true;
  };

  handleRemove = (file: NzUploadFile) => {
    const index = this.fileList.value.findIndex(
      (f: NzUploadFile) => f.uid === file.uid
    );
    if (index > -1) {
      this.fileList.removeAt(index);
    }
    return true;
  };

  get fileList() {
    return this.bannerForm.controls['images'] as FormArray;
  }

  get isOriginalLanguage() {
    return this.langCode === ORIGINAL_LANGUAGE;
  }

  get title() {
    switch (this.type) {
      case 'HOME':
        return 'Trang chủ';
      case 'CONTACT':
        return 'Trang liên hệ';
      case 'INTRO':
        return 'Trang giới thiệu';
      default:
        return '';
    }
  }
}
