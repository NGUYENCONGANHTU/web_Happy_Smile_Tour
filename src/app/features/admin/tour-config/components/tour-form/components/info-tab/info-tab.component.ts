import { Component, inject, Input, OnInit } from '@angular/core';
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
import { TourConfigService } from '../../../../tour-config.service';
import { OptionItem } from '../../../../../../../core/interfaces/base.interface';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CkeditorWrapperComponent } from '../../../../../../../shared/components/ckeditor-wrapper/ckeditor-wrapper.component';

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
    NzInputNumberModule,
    ValidationMessagePipe,
    CkeditorWrapperComponent,
  ],
  standalone: true,
})
export class TourFormInfoTabComponent implements OnInit {
  fb = inject(FormBuilder);
  tourConfigService = inject(TourConfigService);
  locationOptions: OptionItem[] = [];

  @Input({ required: true }) tourForm!: FormGroup;
  @Input({ required: true }) mode!: BaseFormMode;

  ngOnInit(): void {
    this.fetchLocationData();
  }

  fetchLocationData() {
    this.tourConfigService.getLocations().subscribe({
      next: res => {
        this.locationOptions = res.data.map(dt => ({
          value: dt.locationId,
          label: dt.name ?? '',
        }));
      },
    });
  }

  beforeUpload = (_file: NzUploadFile, fileList: NzUploadFile[]) => {
    const oldFileList = fileList;
    this.fileList.clear();
    oldFileList.forEach(file => {
      this.fileList.push(this.fb.control(file));
    });
    return false;
  };

  handleFileListChange(fileList: NzUploadFile[]) {
    console.log(fileList);
    const oldFileList = fileList;
    this.fileList.clear();
    oldFileList.forEach(file => {
      this.fileList.push(this.fb.control(file));
    });
  }

  get fileList() {
    return this.tourForm.controls['images'] as FormArray;
  }

  protected readonly BaseFormMode = BaseFormMode;
}
