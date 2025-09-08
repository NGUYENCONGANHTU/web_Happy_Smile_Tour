import { Component, inject, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { AppService } from '../../../../app.service';
import {
  ContactPrivateTourReqDTO,
  ContactStatus,
  ContactType,
  PrivateTourResDTO,
} from '../../../../interface';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../translatepipe';
import { SafeHtmlPipe } from '../../../shared/utils/helpers/safe-html.pipe';

@Component({
  selector: 'app-private-group-tour',
  imports: [
    NzBreadCrumbModule,
    RouterLink,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    TranslatePipe,
    SafeHtmlPipe,
  ],
  templateUrl: './private-group-tour.component.html',
  styleUrl: './private-group-tour.component.scss',
})
export class PrivateGroupTourComponent implements OnInit {
  appService = inject(AppService);
  translate = inject(TranslateService);
  languageService = inject(LanguageService);
  message = inject(NzMessageService);

  ngOnInit() {
    this.translate.use(this.languageService.locale);
    this.getAllDataPrivateTour();
  }

  dataPrivateTour: PrivateTourResDTO[] = [];
  getAllDataPrivateTour() {
    this.appService.getAllDataPrivateTour().subscribe(res => {
      if (res?.data) {
        this.dataPrivateTour = res.data;
      } else {
        this.dataPrivateTour = [];
      }
    });
  }

  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [''],
    phone: ['', [Validators.required]],
    company: [''],
    number_of_people: [''],
    expected_date: [null],
    budget: [''],
    location: [''],
    message: [''],
  });
  submitForm() {
    if (this.validateForm.valid) {
      const rawForm = this.validateForm.value;

      // Tạo object đúng kiểu ContactPrivateTourReqDTO
      const payload: ContactPrivateTourReqDTO = {
        name: rawForm.name ?? '',
        email: rawForm.email ?? '',
        phone: rawForm.phone ?? '',
        company: rawForm.company ?? '',
        number_of_people: rawForm.number_of_people ?? '',
        expected_date: rawForm.expected_date ?? '',
        budget: rawForm.budget ?? '',
        location: rawForm.location ?? '',
        message: rawForm.message ?? '',
        status: ContactStatus.NEW,
        contactType: ContactType.TOUR,
      };

      this.appService.createDataContactPrivateTour(payload).subscribe({
        next: () => {
          this.message.success('Gửi thông tin thành công!');
          this.validateForm.reset();
        },
        error: () => {
          this.message.error('Gửi thất bại. Vui lòng thử lại!');
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

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  private sanitizer = inject(DomSanitizer);
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
