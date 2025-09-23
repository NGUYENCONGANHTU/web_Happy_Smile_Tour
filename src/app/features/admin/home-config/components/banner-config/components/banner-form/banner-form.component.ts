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
import { NzMessageService } from 'ng-zorro-antd/message';
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
  ],
})
export class BannerFormComponent implements OnChanges {
  @Input({ required: true }) type!: 'HOME' | 'INTRO' | 'CONTACT';
  @Input() langCode!: string;
  message = inject(NzMessageService);
  fb = inject(FormBuilder);
  bannerService = inject(BannerConfigService);

  submitting = false;

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

  /* Hàm submit và upload form */
  onSubmit() {
    if (this.bannerForm.valid) {
      this.submitting = true;
      const formValues = this.bannerForm.value;
      if (this.isOriginalLanguage) {
        this.bannerService
          .updateBannerById(formValues?.id, formValues)
          .subscribe({
            next: _res => {
              this.submitting = false;
              this.message.create('success', 'Cập nhật thành công');
            },
            error: () => {
              this.submitting = false;
              this.message.error('Cập nhật không thành công');
            },
          });
      } else {
        this.bannerService
          .updateBannerTransById(formValues?.id, formValues)
          .subscribe({
            next: _res => {
              this.submitting = false;
              this.message.create('success', 'Cập nhật thành công');
            },
            error: () => {
              this.submitting = false;
              this.message.error('Cập nhật không thành công');
            },
          });
      }
    }
  }

  /* Xử lý hình ảnh upload */
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    this.getBase64(file as any, (img: string) => {
      file.thumbUrl = img;
      this.fileList.push(this.fb.control(file));
    });
    return false;
  };
  /* Hàm xóa hình ảnh */
  handleRemove = (file: NzUploadFile) => {
    const index = this.fileList.value.findIndex(
      (f: NzUploadFile) => f.uid === file.uid
    );
    if (index > -1) {
      this.fileList.removeAt(index);
    }
    return true;
  };
  /* Hàm xử lý hình ảnh base64 */
  getBase64(file: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(file);
  }

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
