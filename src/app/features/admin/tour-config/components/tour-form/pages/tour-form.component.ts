import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BaseFormMode } from '../../../../../../shared/interfaces/form-base.interface';
import { ActivatedRoute } from '@angular/router';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TourConfigService } from '../../../tour-config.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ValidationMessagePipe } from '../../../../../../shared/pipes/validation.pipe';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TourFormInfoTabComponent } from '../components/info-tab/info-tab.component';
import { TourFormPricingTabComponent } from '../components/pricing-tab/pricing-tab.componnet';
import { TourFormServiceTabComponent } from '../components/service-tab/service-tab.component';
import { forkJoin } from 'rxjs';
import { TourFormScheduleTabComponent } from '../components/schedule-tab/schedule-tab.component';

@Component({
  selector: 'app-tour-form',
  templateUrl: 'tour-form.component.html',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
    ValidationMessagePipe,
    NzTabsModule,
    TourFormInfoTabComponent,
    TourFormServiceTabComponent,
    TourFormServiceTabComponent,
    TourFormServiceTabComponent,
    TourFormPricingTabComponent,
    TourFormScheduleTabComponent,
  ],
})
export class TourFormComponent implements OnInit {
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  tourConfigService = inject(TourConfigService);
  notification = inject(NzNotificationService);

  @Input({ required: true }) public mode!: BaseFormMode;

  fetching = false;

  tourForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    star: [null, [Validators.required]],
    destination: [[], [Validators.required]],
    originalPrice: [null, [Validators.required]],
    discount: [0, [Validators.required]],
    finalPrice: [{ value: null, disabled: true }, [Validators.required]],
    stayDate: [null, [Validators.required]],
    locationId: [null, [Validators.required]],
    startingPointIds: [[], [Validators.required]],
    highlight: [null, [Validators.required]],
    service: [null, [Validators.required]],
    nonService: [null, [Validators.required]],
    regulation: [null, [Validators.required]],
    note: [null, [Validators.required]],
    fileList: this.fb.array([]),
  });
  priceForm: FormGroup = this.fb.group({
    tourPrices: this.fb.array([]),
    surcharges: this.fb.array([]),
    discounts: this.fb.array([]),
  });
  scheduleForm: FormGroup = this.fb.group({
    schedules: this.fb.array([
      this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      }),
    ]),
  });
  id?: string | number;

  ngOnInit(): void {
    // Auto-calculate finalPrice
    this.tourForm.valueChanges.subscribe(val => {
      const original = val.originalPrice || 0;
      const discount = val.discount || 0;
      const final = original - discount;
      this.tourForm.get('finalPrice')?.setValue(final, { emitEvent: false });
    });

    this.id = this.route.snapshot.params['id'];
    switch (this.mode) {
      case BaseFormMode.VIEW:
        this.fetchTourData();
        this.tourForm.disable();
        break;
      case BaseFormMode.UPDATE:
        this.fetchTourData();
        break;
      default:
    }
  }

  fetchTourData(toggleLoading = true) {
    if (this.id) {
      if (toggleLoading) {
        this.fetching = true;
      }
      forkJoin({
        tour: this.tourConfigService.getTourById(this.id),
        tourPrices: this.tourConfigService.getTourPricesByTourId(this.id),
        tourDiscounts: this.tourConfigService.getTourDiscountsByTourId(this.id),
        tourSurcharges: this.tourConfigService.getTourSurchargesByTourId(
          this.id
        ),
      }).subscribe({
        next: res => {
          this.tourForm.patchValue(res.tour.data);
          res.tourPrices.data.forEach(dt => {
            this.tourPrices.push(
              this.fb.group({ name: dt.name, age: dt.age, price: dt.price })
            );
          });
          res.tourDiscounts.data.forEach(dt => {
            this.discounts.push(
              this.fb.group({
                name: dt.name,
                description: dt.description,
                price: dt.price,
                condition: dt.condition,
              })
            );
          });
          res.tourSurcharges.data.forEach(dt => {
            this.surcharges.push(
              this.fb.group({ name: dt.name, price: dt.price, apply: dt.apply })
            );
          });
          this.fetching = false;
        },
        error: () => {
          this.fetching = false;
        },
      });
    } else {
      this.notification.error('Lỗi', 'Không tìm thấy id tour');
    }
  }

  submit(): void {
    console.log('this.tourForm: ', this.tourForm);
    console.log('this.priceForm: ', this.priceForm);
    if (this.tourForm.valid) {
      const formValues = this.tourForm.getRawValue();
      const formData = new FormData();

      // Đưa các field đơn giản vào FormData
      for (const key in formValues) {
        const value = formValues[key];
        if (Array.isArray(value)) {
          value.forEach((v: any) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      }
    } else {
      this.tourForm.markAllAsTouched();
    }

    if (this.priceForm.valid) {
      console.log('submitting');
    } else {
      this.priceForm.markAllAsTouched();
    }
  }

  get tourPrices(): FormArray {
    return this.priceForm.get('tourPrices') as FormArray;
  }
  get surcharges(): FormArray {
    return this.priceForm.get('surcharges') as FormArray;
  }
  get discounts(): FormArray {
    return this.priceForm.get('discounts') as FormArray;
  }
}
