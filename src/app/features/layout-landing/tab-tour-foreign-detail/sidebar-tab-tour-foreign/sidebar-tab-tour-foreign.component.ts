import { Component, inject, Input } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {
  faCalendarDays,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ContactStatus, FeatureResDTO } from '../../../../../interface';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DecimalPipe } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactType } from '../../tab-service/interface-contact-tour-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../../../../../app.service';
import { TranslatePipe } from '../../translatepipe';
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
    TranslatePipe,
  ],
  templateUrl: './sidebar-tab-tour-foreign.component.html',
  styleUrl: './sidebar-tab-tour-foreign.component.scss',
})
export class SidebarTabTourForeignComponent {
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  message = inject(NzMessageService);
  @Input() tourDetail: FeatureResDTO | null = null;
  @Input() priceTour = '';
  @Input() nameTour = '';

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }
  appService = inject(AppService);
  handleOk(): void {
    if (this.validateForm.valid) {
      const rawForm = this.validateForm.value;
      const body = {
        name: rawForm.name ?? '',
        email: rawForm.email ?? '',
        phone: rawForm.phone ?? '',
        company: rawForm.company ?? '',
        number_of_people: rawForm.number_of_people ?? '',
        expected_date: rawForm.expected_date ?? '',
        budget: this.priceTour ?? '',
        location: this.nameTour ?? '',
        message: rawForm.message ?? '',
        status: ContactStatus.NEW,
        contactType: ContactType.TOUR,
      };
      this.appService.createDataContactPrivateTour(body).subscribe({
        next: () => {
          this.message.success('Gửi thành công!');
          this.validateForm.reset();
          this.isVisible = false;
        },
        error: () => {
          this.message.error('Lỗi gửi thông tin!');
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
    this.validateForm.reset();
  }

  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [''],
    phone: ['', [Validators.required]],
    company: [''],
    number_of_people: [''],
    expected_date: [''],
    message: [''],
  });
}
