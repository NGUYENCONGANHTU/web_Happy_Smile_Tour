import { Component, inject } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzAutosizeDirective, NzInputDirective } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { faCalendarDays, faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppService } from '../../../../../app.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-form-feedback',
  imports: [
    NzButtonModule,
    NzRateModule,
    NzCardModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzInputDirective,
    NzRowDirective,
    NzDividerComponent,
    NzAutosizeDirective,
    FaIconComponent,
    TranslatePipe,
  ],
  templateUrl: './form-feedback.component.html',
  styleUrl: './form-feedback.component.scss',
})
export class FormFeedbackComponent {
  appService = inject(AppService);
  faStar = faStar;
  private fb = inject(FormBuilder);
  tooltips: string[] = ['1', '2', '3', '4', '5'];
  validateForm = this.fb.group({
    name: [''],
    content: ['', [Validators.required]],
    star: [5],
  });
  submitForm() {
    if (this.validateForm.valid) {
      console.log('Dữ liệu gửi:', this.validateForm.value);
      // const rawForm = this.validateForm.value;
      //
      // // Tạo object đúng kiểu ContactPrivateTourReqDTO
      // const payload: TourCommentDetailReqDTO = {
      //   name: rawForm.name ?? '',
      //   content: rawForm.content ?? '',
      //   star: rawForm.star ?? 5,
      //
      // };
      // this.appService.createDataCommentFeedbackDetail(payload).subscribe({
      //   next: (response) => {
      //     console.log('Gửi thành công:', response);
      //     this.validateForm.reset();
      //   },
      //   error: (err) => {
      //     console.error('Lỗi khi gửi form:', err);
      //     alert('Gửi thất bại. Vui lòng thử lại!');
      //   }
      // });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  protected readonly faCalendarDays = faCalendarDays;
}
