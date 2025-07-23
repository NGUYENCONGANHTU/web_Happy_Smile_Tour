import { Component, inject } from '@angular/core';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { ValidationMessagePipe } from '../../../../../shared/pipes/validation.pipe';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-banner-config',
  templateUrl: './banner-config.component.html',
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
  standalone: true,
})
export class BannerConfigComponent {
  fb = inject(FormBuilder);

  bannerForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    images: this.fb.array([]),
  });

  onSubmit(event: any) {
    console.log(event);
  }

  beforeUpload = (_file: NzUploadFile, fileList: NzUploadFile[]) => {
    const oldFileList = fileList;
    this.fileList.clear();
    oldFileList.forEach(file => {
      this.fileList.push(this.fb.control(file));
    });
    return false;
  };

  get fileList() {
    return this.bannerForm.controls['images'] as FormArray;
  }

  protected readonly BaseFormMode = BaseFormMode;
}
