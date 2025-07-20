import { Component, inject, Input } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {
  faCalendarDays,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO } from '../../../../../interface';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DecimalPipe } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ContactType,
  TourServiceReqDTO,
} from '../../tab-service/interface-contact-tour-service';
import { TabServiceService } from '../../tab-service/tab-service.service';
@Component({
  selector: 'app-sidebar-tab-tour-foreign',
  imports: [
    NzInputModule,
    NzFormModule,
    NzDividerModule,
    FaIconComponent,
    DecimalPipe,
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sidebar-tab-tour-foreign.component.html',
  styleUrl: './sidebar-tab-tour-foreign.component.scss',
})
export class SidebarTabTourForeignComponent {
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  @Input() tourDetail: FeatureResDTO | null = null;

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }
  tourService = inject(TabServiceService);
  handleOk(): void {
    if (this.validateForm.valid) {
      const body: TourServiceReqDTO = {
        name: this.validateForm.value.name ?? '',
        email: this.validateForm.value.email ?? '',
        phone: this.validateForm.value.phone ?? '',
        message: this.validateForm.value.message ?? '',
        contactType: ContactType.TOUR,
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
      this.isVisible = true;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    email: this.fb.control(''),
    phone: this.fb.control('', [Validators.required]),
    message: this.fb.control(''),
  });
}
