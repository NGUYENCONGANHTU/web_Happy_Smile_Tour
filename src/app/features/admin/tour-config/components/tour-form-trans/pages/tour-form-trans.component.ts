import { Component, inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TourConfigService } from '../../../tour-config.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TourFormInfoTabComponent } from '../components/info-tab/info-tab-trans.component';
import { forkJoin } from 'rxjs';
import { parseToNzUploadFile } from '../../../../../../shared/utils/helpers/common.helper';
import {
  TourDiscountReqDTO,
  TourDiscountResDTO,
  TourPriceReqDTO,
  TourPriceResDTO,
  TourScheduleReqDTO,
  TourSurchargeReqDTO,
  TourSurchargeResDTO,
} from '../../../interface';
import { ORIGINAL_LANGUAGE } from '../../../../../../shared/constants/global.constant';
import { LanguageSelectionComponent } from '../../../../../../shared/components/language-selection/language-selection.component';
import { ScheduleTabTransComponent } from '../components/schedule-tab/schedule-tab-trans.component';
import { PricingTabTransComponent } from '../components/pricing-tab/pricing-tab-trans.component';
import { ServiceTabTransComponent } from '../components/service-tab/service-tab-trans.component';
import { SharedDataService } from '../../../../../../shared/services/shared-data.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tour-form-trans',
  templateUrl: 'tour-form-trans.component.html',
  styleUrl: 'tour-form-trans.component.scss',
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
    LanguageSelectionComponent,
    ScheduleTabTransComponent,
    PricingTabTransComponent,
    ServiceTabTransComponent,
    TourFormInfoTabComponent,
    RouterLink,
  ],
})
export class TourFormTransComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  tourConfigService = inject(TourConfigService);
  notification = inject(NzNotificationService);
  sharedService = inject(SharedDataService);
  message = inject(NzMessageService);
  fetching = false;
  submittingTour = false;
  submittingPrice = false;
  submittingSchedule = false;

  tourFormTrans: FormGroup = this.getTourFormGroupTrans();
  tourForm: FormGroup = this.getTourFormGroupTrans();
  priceFormTrans: FormGroup = this.getTourPricesFormGroupTrans();
  priceForm: FormGroup = this.getTourPricesFormGroupTrans();
  scheduleFormTrans: FormGroup = this.getScheduleFormGroupTrans();
  scheduleForm: FormGroup = this.getScheduleFormGroupTrans();
  id?: string | number;
  selectedLanguage = this.sharedService
    .getLanguageOptions()
    .filter(l => l.code !== ORIGINAL_LANGUAGE)[0].code;

  ngOnInit(): void {
    this.tourForm.disable();
    this.priceForm.disable();
    this.scheduleForm.disable();
    this.id = this.route.snapshot.params['id'];
    this.fetchTourData();
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
        tourTrans: this.tourConfigService.getTourTransById(
          this.id,
          this.selectedLanguage
        ),
        tourScheduleTrans: this.tourConfigService.getTourSchedulesTransByTourId(
          this.id,
          this.selectedLanguage
        ),
        tourPricesTrans: this.tourConfigService.getTourPricesTransByTourId(
          this.id,
          this.selectedLanguage
        ),
        tourDiscountsTrans:
          this.tourConfigService.getTourDiscountsTransByTourId(
            this.id,
            this.selectedLanguage
          ),
        tourSurchargesTrans:
          this.tourConfigService.getTourSurchargesTransByTourId(
            this.id,
            this.selectedLanguage
          ),
      }).subscribe({
        next: res => {
          this.tourFormTrans.patchValue({
            ...res.tourTrans.data,
            locationId: res.tour.data.location?.locationId,
            startingPointIds: res.tour.data.startingPoints?.map(
              point => point.id
            ),
          });
          this.tourForm.patchValue({
            ...res.tour.data,
            locationId: res.tour.data.location?.locationId,
            startingPointIds: res.tour.data.startingPoints?.map(
              point => point.locationId
            ),
          });
          this.fileList.clear();
          this.fileListTrans.clear();
          res.tour.data.images.forEach(({ storagePath, id }) => {
            this.fileList.push(
              this.fb.control(parseToNzUploadFile(storagePath, id))
            );
          });
          res.tourTrans.data.images.forEach(({ storagePath, id }) => {
            this.fileListTrans.push(
              this.fb.control(parseToNzUploadFile(storagePath, id))
            );
          });
          this.fileList.disable();
          this.fileListTrans.disable();
          this.tourPrices.clear();
          res.tourPrices.data.forEach(dt => {
            this.tourPrices.push(
              this.fb.group({
                name: dt.name,
                // age: dt.age,
                price: dt.price,
              })
            );
          });
          this.tourPrices.disable();
          this.tourPricesTrans.clear();
          res.tourPricesTrans.data.forEach(dt => {
            this.tourPricesTrans.push(
              this.fb.group({
                id: dt.created ? dt.id : undefined,
                tourPriceId: dt.tourPriceId,
                languageCode: this.selectedLanguage,
                name: dt.name,
                // age: dt.age,
                price: dt.price,
                created: dt.created,
              })
            );
          });
          this.discounts.clear();
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
          this.discounts.disable();
          this.discountsTrans.clear();
          res.tourDiscountsTrans.data.forEach(dt => {
            this.discountsTrans.push(
              this.fb.group({
                id: dt.created ? dt.id : undefined,
                tourDiscountId: dt.tourDiscountId,
                languageCode: this.selectedLanguage,
                name: dt.name,
                description: dt.description,
                price: { value: dt.price, disabled: true },
                condition: dt.condition,
                created: dt.created,
              })
            );
          });
          this.surcharges.clear();
          res.tourSurcharges.data.forEach(dt => {
            this.surcharges.push(
              this.fb.group({ name: dt.name, apply: dt.apply })
            );
          });
          this.surcharges.disable();
          this.surchargesTrans.clear();
          res.tourSurchargesTrans.data.forEach(dt => {
            this.surchargesTrans.push(
              this.fb.group({
                id: dt.created ? dt.id : undefined,
                tourSurchargeId: dt.tourSurchargeId,
                languageCode: this.selectedLanguage,
                name: dt.name,
                // price: { value: dt.price, disabled: true },
                apply: dt.apply,
                created: dt.created,
              })
            );
          });
          this.tourSchedules.clear();
          res.tourSchedule.data.forEach(dt => {
            this.tourSchedules.push(
              this.fb.group({ title: dt.title, description: dt.description })
            );
          });
          this.scheduleForm.disable();
          this.tourSchedulesTrans.clear();
          res.tourScheduleTrans.data.forEach(dt => {
            this.tourSchedulesTrans.push(
              this.fb.group({
                id: dt.id,
                tourScheduleId: dt.tourScheduleId,
                languageCode: this.selectedLanguage,
                title: dt.title,
                description: dt.description,
                created: dt.created,
              })
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

  submit(part: 'INFO' | 'SCHEDULES' | 'PRICES'): void {
    if (this.id) {
      switch (part) {
        case 'INFO':
          if (this.tourFormTrans.valid) {
            this.submittingTour = true;
            const formValues = this.tourFormTrans.value;
            if (this.tourFormTrans?.value?.created) {
              this.tourConfigService
                .updateTourTransById(formValues?.id, formValues)
                .subscribe({
                  next: _res => {
                    this.submittingTour = false;
                  },
                  error: () => {
                    this.submittingTour = false;
                  },
                });
            } else {
              this.tourConfigService
                .createTourTrans({
                  ...formValues,
                  tourId: this.id,
                  languageCode: this.selectedLanguage,
                })
                .subscribe({
                  next: _res => {
                    this.submittingTour = false;
                    this.message.success('Thêm thành công!');
                  },
                  error: () => {
                    this.submittingTour = false;
                  },
                });
            }
          } else {
            this.tourFormTrans.markAllAsTouched();
          }
          break;
        case 'PRICES':
          if (this.priceFormTrans.valid) {
            this.submittingPrice = true;
            const tourPrices: TourPriceReqDTO[] =
              this.tourPricesTrans.value.map((price: TourPriceResDTO) => ({
                ...price,
                tourId: this.id,
              })) ?? [];
            const tourDiscounts: TourDiscountReqDTO[] =
              this.discountsTrans.value.map((discount: TourDiscountResDTO) => ({
                ...discount,
                tourId: this.id,
              })) ?? [];
            const tourSurcharges: TourSurchargeReqDTO[] =
              this.surchargesTrans.value.map(
                (surcharges: TourSurchargeResDTO) => ({
                  ...surcharges,
                  tourId: this.id,
                })
              ) ?? [];
            if (tourPrices.length) {
              this.tourConfigService
                .createTourPricesTrans(tourPrices)
                .subscribe({
                  next: () => {
                    this.submittingPrice = false;
                    this.message.success('Thêm thành công!');
                  },
                  error: () => {
                    this.submittingPrice = false;
                  },
                });
            }
            if (tourDiscounts.length) {
              this.tourConfigService
                .createTourDiscountTrans(tourDiscounts)
                .subscribe({
                  next: () => {
                    this.submittingPrice = false;
                    this.message.success('Thêm thành công!');
                  },
                  error: () => {
                    this.submittingPrice = false;
                  },
                });
            }
            if (tourSurcharges.length) {
              this.tourConfigService
                .createTourSurchargeTrans(tourSurcharges)
                .subscribe({
                  next: () => {
                    this.submittingPrice = false;
                    this.message.success('Thêm thành công!');
                  },
                  error: () => {
                    this.submittingPrice = false;
                  },
                });
            }
          } else {
            this.priceFormTrans.markAllAsTouched();
          }
          break;
        case 'SCHEDULES':
          if (this.scheduleFormTrans.valid) {
            this.submittingSchedule = true;
            const tourSchedules: TourScheduleReqDTO[] =
              this.tourSchedulesTrans.value.map(
                (surcharges: TourSurchargeResDTO) => ({
                  ...surcharges,
                  tourId: this.id,
                })
              ) ?? [];
            this.tourConfigService
              .createTourScheduleTrans(tourSchedules)
              .subscribe({
                next: () => {
                  this.submittingSchedule = false;
                  this.message.success('Thêm thành công!');
                },
                error: () => {
                  this.submittingSchedule = false;
                },
              });
          } else {
            this.scheduleFormTrans.markAllAsTouched();
          }
          break;
        default:
      }
    } else {
      this.notification.error('Lỗi', 'Không tìm thấy id tour.');
    }
  }

  handleSelectedLanguageChange(lang?: string) {
    if (lang) {
      this.fetchTourData();
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

  getTourFormGroupTrans() {
    return this.fb.group({
      title: [null, [Validators.required]],
      // averageRate: [{ value: null, disabled: true }],
      originalPrice: [0, [Validators.required]],
      discount: [0],
      finalPrice: [{ value: 0, disabled: true }],
      currencyUnit: [null, [Validators.required]],
      stayDate: [null, [Validators.required]],
      locationId: [{ value: null, disabled: true }, [Validators.required]],
      startingPointIds: [{ value: [], disabled: true }, [Validators.required]],
      highlight: [null, [Validators.required]],
      service: [null, [Validators.required]],
      nonService: [null, [Validators.required]],
      regulation: [null, [Validators.required]],
      note: [null, [Validators.required]],
      images: this.fb.array([]),
      created: [false],
      id: [null],
    });
  }

  getTourPricesFormGroupTrans() {
    return this.fb.group({
      tourPrices: this.fb.array([]),
      surcharges: this.fb.array([]),
      discounts: this.fb.array([]),
    });
  }

  getScheduleFormGroupTrans() {
    return this.fb.group({
      schedules: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
        }),
      ]),
    });
  }

  get isOriginalTrans() {
    return this.selectedLanguage === ORIGINAL_LANGUAGE;
  }

  get submitting(): boolean {
    return (
      this.submittingTour || this.submittingPrice || this.submittingSchedule
    );
  }

  get fileList(): FormArray {
    return this.tourForm.get('images') as FormArray;
  }

  get fileListTrans(): FormArray {
    return this.tourFormTrans.get('images') as FormArray;
  }

  get tourSchedules(): FormArray {
    return this.scheduleForm.get('schedules') as FormArray;
  }

  get tourSchedulesTrans(): FormArray {
    return this.scheduleFormTrans.get('schedules') as FormArray;
  }

  get tourPrices(): FormArray {
    return this.priceForm.get('tourPrices') as FormArray;
  }

  get tourPricesTrans(): FormArray {
    return this.priceFormTrans.get('tourPrices') as FormArray;
  }

  get surcharges(): FormArray {
    return this.priceForm.get('surcharges') as FormArray;
  }

  get surchargesTrans(): FormArray {
    return this.priceFormTrans.get('surcharges') as FormArray;
  }

  get discounts(): FormArray {
    return this.priceForm.get('discounts') as FormArray;
  }

  get discountsTrans(): FormArray {
    return this.priceFormTrans.get('discounts') as FormArray;
  }

  protected readonly BaseFormMode = BaseFormMode;
}
