import { Component, inject, Input, OnInit } from '@angular/core';
import { LanguageSelectionComponent } from '../../../../../shared/components/language-selection/language-selection.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ServiceConfigService } from '../../service-config.service';
import { ActivatedRoute } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';
import {
  getBase64,
  parseToNzUploadFile,
  sanitizeUrl,
} from '../../../../../shared/utils/helpers/common.helper';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-visa-service-form',
  templateUrl: 'visa-service-form.component.html',
  imports: [
    LanguageSelectionComponent,
    NzButtonComponent,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzIconModule,
    NzUploadModule,
    NzDropDownModule,
  ],
  standalone: true,
})
export class VisaServiceFormComponent implements OnInit {
  @Input({ required: true }) mode!: BaseFormMode;

  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  serviceConfigService = inject(ServiceConfigService);
  notification = inject(NzNotificationService);

  submittingVisaService = false;
  submittingVisaProcess = false;
  fetching = false;
  fetchingVisaProcess = false;

  selectedLanguage = ORIGINAL_LANGUAGE;

  visaServiceId!: string | number;
  imgPreview = '';
  visaServiceForm: FormGroup = this.fb.group({
    visaServiceId: [''],
    name: [''],
    bannerTitle: [''],
    phone: [''],
    serviceTitle: [''],
    serviceContent: [''],
    workflow: [''],
    processSteps: this.fb.array([]),
    created: [false],
    image: [[]],
  });

  ngOnInit() {
    this.visaServiceId = this.route.snapshot.params['id'];
    if (this.mode !== BaseFormMode.CREATE) {
      this.fetchVisaServiceData();
    }
  }

  fetchVisaServiceData() {
    this.fetching = true;
    this.serviceConfigService
      .getServiceTransById(this.visaServiceId, this.selectedLanguage)
      .subscribe({
        next: res => {
          this.visaServiceForm.patchValue({
            ...res.data,
            image: res.data?.image
              ? parseToNzUploadFile(
                  res.data.image?.storagePath,
                  res.data.image?.id
                )
              : null,
          });
          this.processSteps.clear();
          res.data.visaProcesses.forEach(vp => {
            this.processSteps.push(this.fb.group(vp));
          });
          if (!this.processSteps.length) {
            this.processSteps.push(this.createItem());
          }
          this.imgPreview = sanitizeUrl(res.data?.image?.storagePath ?? '');
          this.fetching = false;
        },
        error: () => {
          this.fetching = false;
        },
      });
  }

  onSubmit(_event: any) {
    if (this.visaServiceForm.valid) {
      this.submittingVisaService = true;
      if (this.mode === BaseFormMode.CREATE) {
        this.serviceConfigService
          .createService(this.visaServiceForm.value)
          .subscribe({
            next: res => {
              if (res.data?.id) {
                this.submittingVisaProcess = true;
                this.serviceConfigService
                  .modifyVisaProcess(
                    this.processSteps.value?.map(
                      (step: { title: string; description: string }) => ({
                        ...step,
                        visaServiceId: this.visaServiceId,
                      })
                    )
                  )
                  .subscribe({
                    next: () => {
                      this.submittingVisaProcess = false;
                    },
                    error: () => {
                      this.submittingVisaProcess = false;
                    },
                  });
              } else {
                this.notification.error('Lỗi', 'Không tìm thấy visa id.');
                this.submittingVisaService = false;
              }
            },
            error: () => {
              this.submittingVisaService = false;
            },
          });
      } else {
        if (this.isOriginalLanguage) {
          this.submittingVisaService = true;
          this.serviceConfigService
            .updateServiceById(this.visaServiceId, this.visaServiceForm.value)
            .subscribe({
              next: () => {
                this.submittingVisaService = false;
              },
              error: () => {
                this.submittingVisaService = false;
              },
            });
          this.submittingVisaProcess = true;
          this.serviceConfigService
            .modifyVisaProcess(
              this.processSteps.value?.map(
                (step: { title: string; description: string }) => ({
                  ...step,
                  visaServiceId: this.visaServiceId,
                  languageCode: this.selectedLanguage,
                })
              )
            )
            .subscribe({
              next: () => {
                this.submittingVisaProcess = false;
              },
              error: () => {
                this.submittingVisaProcess = false;
              },
            });
        } else {
          this.submittingVisaService = true;
          if (this.visaServiceForm.value?.created) {
            this.serviceConfigService
              .updateServiceTransById(
                this.visaServiceForm.value?.visaServiceId,
                this.visaServiceForm.value
              )
              .subscribe({
                next: () => {
                  this.submittingVisaService = false;
                },
                error: () => {
                  this.submittingVisaService = false;
                },
              });
          } else {
            this.serviceConfigService
              .createServiceTrans({
                ...this.visaServiceForm.value,
                visaServiceId: this.visaServiceId,
                languageCode: this.selectedLanguage,
              })
              .subscribe({
                next: () => {
                  this.submittingVisaService = false;
                },
                error: () => {
                  this.submittingVisaService = false;
                },
              });
          }
          this.submittingVisaProcess = true;
          this.serviceConfigService
            .modifyVisaProcessTrans(
              this.processSteps.value?.map(
                (dt: {
                  id?: number;
                  visaProcessId?: number;
                  title: string;
                  description: string;
                  created?: boolean;
                }) => ({
                  ...dt,
                  id: dt?.created ? dt?.id : undefined,
                  visaProcessId: dt?.visaProcessId,
                  languageCode: this.selectedLanguage,
                })
              )
            )
            .subscribe({
              next: () => {
                this.submittingVisaProcess = false;
              },
              error: () => {
                this.submittingVisaProcess = false;
              },
            });
        }
      }
    }
  }

  beforeUpload = (file: NzUploadFile) => {
    this.visaServiceForm.patchValue({ image: file });
    getBase64(file as unknown as File, (img: string) => {
      this.imgPreview = img;
    });
    return false;
  };

  createItem(): FormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
    });
  }

  addStep(index?: number) {
    this.processSteps.insert(index ?? 0, this.createItem());
    this.processSteps.updateValueAndValidity();
  }

  removeStep(index: number) {
    this.processSteps.removeAt(index);
  }

  swapSteps(index1: number, index2: number) {
    if (
      index1 === index2 ||
      index1 < 0 ||
      index2 < 0 ||
      index1 >= this.processSteps.length ||
      index2 >= this.processSteps.length
    ) {
      return; // Prevent invalid swaps
    }
    const controls = this.processSteps.controls;
    // Swap the controls
    const temp = controls[index1];
    controls[index1] = controls[index2];
    controls[index2] = temp;
    // Trigger change detection
    this.processSteps.updateValueAndValidity();
  }

  get isOriginalLanguage() {
    return this.selectedLanguage === ORIGINAL_LANGUAGE;
  }

  get processSteps() {
    return this.visaServiceForm.get('processSteps') as FormArray;
  }
}
