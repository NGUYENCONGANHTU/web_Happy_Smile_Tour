import { Component, inject, OnInit } from '@angular/core';
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { ContactVisaReqDTO, PrivateTourResDTO } from '../../../../interface';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-tab-service',
  standalone: true,
  imports: [
    FaIconComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    NzFormLabelComponent,
    NgStyle,
  ],
  templateUrl: './tab-service.component.html',
  styleUrl: './tab-service.component.scss',
})
export class TabServiceComponent implements OnInit {
  faPhoneFlip = faPhoneFlip;
  appService = inject(AppService);

  ngOnInit() {
    this.getDataBannerTabService();
    this.getDataVisaTabService();
    this.getDataContentTabService();
    this.getDataTitleWorkflowTabService();
    this.getDataWorkflowTabService();
  }

  // get data Banner tab service
  dataBannerTabService: PrivateTourResDTO[] = [];
  getDataBannerTabService() {
    this.appService.getAllDataBannerTabService().subscribe(data => {
      this.dataBannerTabService = data;
    });
  }
  // get data VISA tab service
  dataVisaTabService: PrivateTourResDTO[] = [];
  getDataVisaTabService() {
    this.appService.getAllDataVisaPrivateTour().subscribe(data => {
      this.dataVisaTabService = data;
    });
  }
  // get data Content tab service
  dataContentTabService: PrivateTourResDTO[] = [];
  getDataContentTabService() {
    this.appService.getAllDataContentTabService().subscribe(data => {
      this.dataContentTabService = data;
    });
  }
  // Tiêu đề quy trình
  dataTitleWorkflowTabService: PrivateTourResDTO[] = [];
  getDataWorkflowTabService() {
    this.appService.getAllDataWorkflowTabService().subscribe(data => {
      this.dataTitleWorkflowTabService = data;
    });
  }
  // get data Workflow tab service
  dataWorkflowTabService: PrivateTourResDTO[] = [];
  getDataTitleWorkflowTabService() {
    this.appService.getAllDataTitleWorkflowTabService().subscribe(data => {
      this.dataWorkflowTabService = data;
    });
  }

  // ================================================ SUBMIT FORM ============================================== //

  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [''],
    phone: ['', [Validators.required]],
    message: [''],
  });
  submitForm() {
    if (this.validateForm.valid) {
      const formData = this.validateForm.getRawValue() as ContactVisaReqDTO;
      this.appService.createDataContactVisa(formData).subscribe({
        next: res => {
          console.log('API Response:', res);
          this.validateForm.reset();
        },
        error: err => {
          console.error('API Error:', err);
        },
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
