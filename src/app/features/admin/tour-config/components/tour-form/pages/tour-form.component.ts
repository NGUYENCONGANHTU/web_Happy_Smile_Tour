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
import { ActivatedRoute, Router } from '@angular/router';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TourConfigService } from '../../../tour-config.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TourFormInfoTabComponent } from '../components/info-tab/info-tab.component';
import { TourFormPricingTabComponent } from '../components/pricing-tab/pricing-tab.componnet';
import { TourFormServiceTabComponent } from '../components/service-tab/service-tab.component';
import { forkJoin } from 'rxjs';
import { TourFormScheduleTabComponent } from '../components/schedule-tab/schedule-tab.component';
import { parseToNzUploadFile } from '../../../../../../shared/utils/helpers';
import {
  TourDiscountReqDTO,
  TourDiscountResDTO,
  TourPriceReqDTO,
  TourPriceResDTO,
  TourScheduleReqDTO,
  TourSurchargeReqDTO,
  TourSurchargeResDTO,
} from '../../../interface';

@Component({
  selector: 'app-tour-form',
  templateUrl: 'tour-form.component.html',
  styleUrl: 'tour-form.component.scss',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
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
  router = inject(Router);
  fb = inject(FormBuilder);
  tourConfigService = inject(TourConfigService);
  notification = inject(NzNotificationService);

  @Input({ required: true }) public mode!: BaseFormMode;

  fetching = false;
  submittingTour = false;
  submittingPrice = false;
  submittingSchedule = false;

  tourForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    star: [null, [Validators.required]],
    destination: [[], [Validators.required]],
    originalPrice: [null, [Validators.required]],
    discount: [0, [Validators.required]],
    finalPrice: [null, [Validators.required]],
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
        tourSchedule: this.tourConfigService.getTourSchedulesByTourId(this.id),
        tourPrices: this.tourConfigService.getTourPricesByTourId(this.id),
        tourDiscounts: this.tourConfigService.getTourDiscountsByTourId(this.id),
        tourSurcharges: this.tourConfigService.getTourSurchargesByTourId(
          this.id
        ),
      }).subscribe({
        next: res => {
          this.tourForm.patchValue({
            ...res.tour.data,
            startingPointIds: res.tour.data.startingPoints?.map(
              point => point.id
            ),
          });
          res.tour.data.imageUrl.forEach(src => {
            this.fileList.push(this.fb.control(parseToNzUploadFile(src)));
          });
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
          this.tourSchedules.clear();
          res.tourSchedule.data.forEach(dt => {
            this.tourSchedules.push(
              this.fb.group({ title: dt.title, description: dt.description })
            );
          });
          if (this.mode === BaseFormMode.VIEW) {
            this.tourForm.disable();
            this.priceForm.disable();
            this.scheduleForm.disable();
          }
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
    if (this.mode === BaseFormMode.UPDATE) {
      if (this.id) {
        if (
          this.tourForm.valid &&
          this.priceForm.valid &&
          this.scheduleForm.valid
        ) {
          this.submittingTour = true;
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
          this.tourConfigService.updateTourById(this.id, formData).subscribe({
            next: _res => {
              this.submittingTour = false;
              this.goTo(BaseFormMode.VIEW);
            },
            error: () => {
              this.submittingTour = false;
            },
          });
          this.submittingPrice = true;
          const tourPrices: TourPriceReqDTO[] =
            this.tourPrices.value.map((price: TourPriceResDTO) => ({
              ...price,
              tourId: this.id,
            })) ?? [];
          const tourDiscounts: TourDiscountReqDTO[] =
            this.discounts.value.map((discount: TourDiscountResDTO) => ({
              ...discount,
              tourId: this.id,
            })) ?? [];
          const tourSurcharges: TourSurchargeReqDTO[] =
            this.tourPrices.value.map((surcharges: TourSurchargeResDTO) => ({
              ...surcharges,
              tourId: this.id,
            })) ?? [];
          if (tourPrices.length) {
            this.tourConfigService.updateTourPrices(tourPrices).subscribe({
              next: () => {
                this.submittingPrice = false;
              },
              error: () => {
                this.submittingPrice = false;
              },
            });
          }
          if (tourDiscounts.length) {
            this.tourConfigService
              .updateTourDiscounts(tourDiscounts)
              .subscribe({
                next: () => {
                  this.submittingPrice = false;
                },
                error: () => {
                  this.submittingPrice = false;
                },
              });
          }
          if (tourSurcharges.length) {
            this.tourConfigService
              .updateTourSurcharges(tourSurcharges)
              .subscribe({
                next: () => {
                  this.submittingPrice = false;
                },
                error: () => {
                  this.submittingPrice = false;
                },
              });
          }
          this.submittingSchedule = true;
          const tourSchedules: TourScheduleReqDTO[] =
            this.tourSchedules.value.map((surcharges: TourSurchargeResDTO) => ({
              ...surcharges,
              tourId: this.id,
            })) ?? [];
          this.tourConfigService.updateTourSchedules(tourSchedules).subscribe({
            next: () => {
              this.submittingSchedule = false;
            },
            error: () => {
              this.submittingSchedule = false;
            },
          });
        } else {
          this.tourForm.markAllAsTouched();
          this.priceForm.markAllAsTouched();
          this.scheduleForm.markAllAsTouched();
        }
      } else {
        this.notification.error('Lỗi', 'Không tìm thấy id tour.');
      }
    } else {
      if (this.tourForm.valid) {
        this.submittingTour = true;
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
        this.tourConfigService.createTour(formData).subscribe({
          next: res => {
            if (this.priceForm.valid) {
              this.submittingPrice = true;
              const tourPrices: TourPriceReqDTO[] =
                this.tourPrices.value.map((price: TourPriceResDTO) => ({
                  ...price,
                  tourId: res.id,
                })) ?? [];
              const tourDiscounts: TourDiscountReqDTO[] =
                this.discounts.value.map((discount: TourDiscountResDTO) => ({
                  ...discount,
                  tourId: res.id,
                })) ?? [];
              const tourSurcharges: TourSurchargeReqDTO[] =
                this.tourPrices.value.map(
                  (surcharges: TourSurchargeResDTO) => ({
                    ...surcharges,
                    tourId: res.id,
                  })
                ) ?? [];
              if (tourPrices.length) {
                this.tourConfigService.createTourPrices(tourPrices).subscribe({
                  next: () => {
                    this.submittingPrice = false;
                  },
                  error: () => {
                    this.submittingPrice = false;
                  },
                });
              }
              if (tourDiscounts.length) {
                this.tourConfigService
                  .createTourDiscounts(tourDiscounts)
                  .subscribe({
                    next: () => {
                      this.submittingPrice = false;
                    },
                    error: () => {
                      this.submittingPrice = false;
                    },
                  });
              }
              if (tourSurcharges.length) {
                this.tourConfigService
                  .createTourSurcharges(tourSurcharges)
                  .subscribe({
                    next: () => {
                      this.submittingPrice = false;
                    },
                    error: () => {
                      this.submittingPrice = false;
                    },
                  });
              }
            } else {
              this.priceForm.markAllAsTouched();
            }
            if (this.scheduleForm.valid) {
              this.submittingSchedule = true;
              const tourSchedules: TourScheduleReqDTO[] =
                this.tourSchedules.value.map(
                  (surcharges: TourSurchargeResDTO) => ({
                    ...surcharges,
                    tourId: res.id,
                  })
                ) ?? [];
              this.tourConfigService
                .createTourSchedules(tourSchedules)
                .subscribe({
                  next: () => {
                    this.submittingSchedule = false;
                  },
                  error: () => {
                    this.submittingSchedule = false;
                  },
                });
            } else {
              this.scheduleForm.markAllAsTouched();
            }
            this.submittingTour = false;
          },
          error: () => {
            this.submittingTour = false;
          },
        });
      } else {
        this.tourForm.markAllAsTouched();
      }
    }
  }

  goTo(target: string, _data?: any) {
    switch (target) {
      case BaseFormMode.CREATE:
        this.router.navigate(['admin', 'tour-config', 'create']);
        break;
      case BaseFormMode.UPDATE:
        this.router.navigate(['admin', 'tour-config', this.id, 'update']);
        break;
      case BaseFormMode.VIEW:
        this.router.navigate(['admin', 'tour-config', this.id, 'view']);
        break;
      default:
    }
  }

  get submitting(): boolean {
    return (
      this.submittingTour || this.submittingPrice || this.submittingSchedule
    );
  }

  get fileList(): FormArray {
    return this.tourForm.get('fileList') as FormArray;
  }

  get tourSchedules(): FormArray {
    return this.scheduleForm.get('schedules') as FormArray;
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

  protected readonly BaseFormMode = BaseFormMode;
}
