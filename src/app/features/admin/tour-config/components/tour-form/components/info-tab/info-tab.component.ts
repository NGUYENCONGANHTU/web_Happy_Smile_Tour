import { Component, inject, Input } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationMessagePipe } from '../../../../../../../shared/pipes/validation.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-tour-form-info-tab',
  templateUrl: 'info-tab.component.html',
  imports: [
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
    ValidationMessagePipe,
  ],
  standalone: true,
})
export class TourFormInfoTabComponent {
  fb = inject(FormBuilder);

  @Input({ required: true }) tourForm!: FormGroup;

  beforeUpload = (_file: NzUploadFile, fileList: NzUploadFile[]) => {
    const oldFileList = fileList;
    this.fileList.clear();
    oldFileList.forEach(file => {
      this.fileList.push(this.fb.control(file));
    });
    return false;
  };

  get fileList() {
    return this.tourForm.controls['fileList'] as FormArray;
  }
}
