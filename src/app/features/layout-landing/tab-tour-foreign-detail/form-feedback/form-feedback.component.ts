import { Component, inject, Input, OnInit } from '@angular/core';
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
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppService } from '../../../../../app.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  FeatureResDTO,
  TourCommentDetailReqDTO,
} from '../../../../../interface';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../../translation.service';
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
  ],
  templateUrl: './form-feedback.component.html',
  styleUrl: './form-feedback.component.scss',
})
export class FormFeedbackComponent implements OnInit {
  @Input() tourDetail: FeatureResDTO | null = null;
  appService = inject(AppService);
  message = inject(NzMessageService);
  faStar = faStar;
  private fb = inject(FormBuilder);
  tooltips: string[] = ['1', '2', '3', '4', '5'];
  validateForm = this.fb.group({
    name: [''],
    content: ['', [Validators.required]],
    rate: [5],
  });

  submitForm() {
    if (this.validateForm.valid) {
      const rawForm = this.validateForm.value;

      // Tạo object đúng kiểu ContactPrivateTourReqDTO
      const payload: TourCommentDetailReqDTO = {
        name: rawForm.name ?? '',
        content: rawForm.content ?? '',
        rate: rawForm.rate ?? 5,
        tourId: this.tourDetail?.tourId ?? 0,
      };
      this.appService.createDataCommentFeedbackDetail(payload).subscribe({
        next: () => {
          this.message.success(
            'Đánh giá của bạn đã được tiếp nhận, cảm ơn bạn vì sự đóng góp!!'
          );
          this.validateForm.reset();
        },
        error: () => {
          this.message.error('Có lỗi xảy ra!!!');
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
  ngOnInit() {
    this.getDataTransitionTour();
  }

  // service Language
  transitionService = inject(TranslationService);
  dataTrans: TranslationResponse['data'] | null = null;

  getDataTransitionTour() {
    this.transitionService.getDataTransLate().subscribe(res => {
      this.dataTrans = res.data;
    });
  }
  getTrans(key: TranslationSection, value: string, fallback = ''): string {
    return this.dataTrans?.[key]?.[value] ?? fallback;
  }
}
