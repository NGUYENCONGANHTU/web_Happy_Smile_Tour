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
import { ActivatedRoute } from '@angular/router';
import { TabServiceService } from './tab-service.service';
import {
  ContactType,
  TourServiceReqDTO,
} from './interface-contact-tour-service';
import { VisaProcessResDTO, VisaServiceResDTO } from '../../../../interface';
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
  ],
  templateUrl: './tab-service.component.html',
  styleUrl: './tab-service.component.scss',
})
export class TabServiceComponent implements OnInit {
  appService = inject(AppService);

  serviceId = 0;
  dataServiceDetail: VisaServiceResDTO | null = null;
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.serviceId = Number(idParam);
        this.getAllDataServiceById();
      }
    });
    this.getAllDataServiceById();
    this.getAllDataVisaProcess();
  }
  getAllDataServiceById() {
    this.appService.getDataByIdMenuService(this.serviceId).subscribe({
      next: res => {
        this.dataServiceDetail = res.data;
        console.log(this.dataServiceDetail);
      },
      error: err => {
        console.error('Error loading news detail:', err);
      },
    });
  }

  dataVisaProcess: VisaProcessResDTO[] = [];
  getAllDataVisaProcess() {
    this.appService.getAllDataVisaProcess().subscribe(data => {
      this.dataVisaProcess = data;
    });
  }

  faPhoneFlip = faPhoneFlip;
  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [''],
    phone: ['', [Validators.required]],
    message: [''],
  });

  //
  tourService = inject(TabServiceService);
  submitForm() {
    if (this.validateForm.valid) {
      const body: TourServiceReqDTO = {
        name: this.validateForm.value.name ?? '',
        email: this.validateForm.value.email ?? '',
        phone: this.validateForm.value.phone ?? '',
        message: this.validateForm.value.message ?? '',
        contactType: ContactType.VISA,
      };
      this.tourService.createDataTourService(body).subscribe({
        next: res => {
          console.log('Gửi thành công:', res);
          this.validateForm.reset();
        },
        error: err => {
          console.error('Lỗi khi gửi dữ liệu:', err);
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
