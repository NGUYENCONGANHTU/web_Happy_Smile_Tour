import { Component, inject, OnInit } from '@angular/core';
import { LanguageSelectionComponent } from '../../../../../shared/components/language-selection/language-selection.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';
import { IntroConfigService } from './intro-config.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { ValidationMessagePipe } from '../../../../../shared/pipes/validation.pipe';
import {
  getBase64,
  sanitizeUrl,
} from '../../../../../shared/utils/helpers/common.helper';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-intro-config',
  templateUrl: 'intro-config.component.html',
  imports: [
    LanguageSelectionComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzUploadModule,
    NzIconModule,
    ValidationMessagePipe,
  ],
  standalone: true,
})
export class IntroConfigComponent implements OnInit {
  fb = inject(FormBuilder);
  introConfigService = inject(IntroConfigService);

  submitting = false;

  selectedLanguage = ORIGINAL_LANGUAGE;
  imgPreview = ['', '', '', ''];
  introForm: FormGroup = this.fb.group({
    id: [''],
    introId: [''],
    title: [''],
    description: [''],
    introTitles: this.fb.array([
      this.fb.group({ title: '' }),
      this.fb.group({ title: '' }),
    ]),
    advertises: this.fb.array([]),
    statistics: this.fb.array([]),
    created: [false],
  });

  ngOnInit() {
    this.fetchAllData();
  }

  fetchAllData() {
    this.fetchIntro();
    this.fetchTitles();
    this.fetchAdvertises();
    this.fetchStatistics();
  }

  fetchIntro() {
    this.introConfigService
      .getIntroDataTrans(this.selectedLanguage, 'MAIN')
      .subscribe({
        next: res => {
          if (res.data?.length) {
            this.introForm.patchValue(res.data[0]);
          }
        },
      });
  }

  fetchTitles() {
    this.introConfigService
      .getIntroTitlesTrans(this.selectedLanguage)
      .subscribe({
        next: res => {
          if (res.data?.length) {
            this.introTitles.clear();
            res.data.forEach(dt => {
              this.introTitles.push(this.fb.group(dt));
            });
            console.log(this.introTitles);
          }
        },
      });
  }

  fetchAdvertises() {
    this.introConfigService
      .getAdvertisementsTrans(this.selectedLanguage)
      .subscribe({
        next: res => {
          if (res.data?.length) {
            this.advertises.clear();
            res.data.forEach((dt, index) => {
              this.advertises.push(this.fb.group(dt));
              this.imgPreview[index] = sanitizeUrl(dt.image.storagePath ?? '');
            });
          }
        },
      });
  }

  fetchStatistics() {
    this.introConfigService
      .getIntroDataTrans(this.selectedLanguage, 'STATISTICAL')
      .subscribe({
        next: res => {
          if (res.data?.length) {
            this.statistics.clear();
            res.data.forEach(dt => {
              this.statistics.push(this.fb.group(dt));
            });
          }
        },
      });
  }

  onSubmit(_event: SubmitEvent) {
    if (this.introForm.valid) {
      this.submitting = true;
      if (this.isOriginalLanguage) {
        if (
          this.introForm.get('title')?.dirty ||
          this.introForm.get('description')?.dirty
        ) {
          this.introConfigService
            .updateIntroDataById(this.introForm.value?.introId, {
              title: this.introForm.value.title,
              description: this.introForm.value.description,
              introType: 'MAIN',
            })
            .subscribe({
              next: () => {
                this.submitting = false;
              },
              error: () => {
                this.submitting = false;
              },
            });
        }
        this.introTitles.controls?.forEach(control => {
          if (control.dirty) {
            this.introConfigService
              .updateIntroTitleById(control.value.id, {
                title: control.value.title,
              })
              .subscribe();
          }
        });
        this.advertises.controls.forEach(control => {
          if (control.dirty) {
            this.introConfigService
              .updateAdvertisementById(control.value?.id, {
                title: control.value?.title,
                image: control.value?.image,
              })
              .subscribe();
          }
        });
      } else {
        if (
          this.introForm.get('title')?.dirty ||
          this.introForm.get('description')?.dirty
        ) {
          if (this.introForm.value.created) {
            this.introConfigService
              .updateIntroTransById(this.introForm.value?.id, {
                introId: this.introForm.value.introId,
                title: this.introForm.value.title,
                description: this.introForm.value.description,
                languageCode: this.selectedLanguage,
              })
              .subscribe({
                next: () => {
                  this.submitting = false;
                },
                error: () => {
                  this.submitting = false;
                },
              });
          } else {
            this.introConfigService
              .createIntroTransByLangCode({
                introId: this.introForm.value.introId,
                title: this.introForm.value.title,
                description: this.introForm.value.description,
                languageCode: this.selectedLanguage,
              })
              .subscribe({
                next: () => {
                  this.submitting = false;
                },
                error: () => {
                  this.submitting = false;
                },
              });
          }
        }
        this.introTitles.controls?.forEach(control => {
          if (control.dirty) {
            if (control.value?.created) {
              this.introConfigService
                .updateIntroTitleTransById(control.value.id, {
                  introTitleId: control.value.introTitleId,
                  title: control.value.title,
                  languageCode: this.selectedLanguage,
                })
                .subscribe();
            } else {
              this.introConfigService
                .createIntroTitleTrans({
                  introTitleId: control.value.introTitleId,
                  title: control.value.title,
                  languageCode: this.selectedLanguage,
                })
                .subscribe();
            }
          }
        });
        this.advertises.controls.forEach(control => {
          if (control.dirty) {
            if (control.value?.created) {
              this.introConfigService
                .updateAdvertisementTransById(control.value?.id, {
                  title: control.value?.title,
                  advertiseId: control.value?.advertiseId,
                  languageCode: this.selectedLanguage,
                })
                .subscribe();
            } else {
              this.introConfigService
                .createAdvertisementTrans({
                  title: control.value?.title,
                  advertiseId: control.value?.advertiseId,
                  languageCode: this.selectedLanguage,
                })
                .subscribe();
            }
          }
        });
      }
    }
  }

  beforeUploadFns = (index: number) => {
    return (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
      this.advertises.controls[index].patchValue({ image: file });
      getBase64(file as unknown as File, (img: string) => {
        this.imgPreview[index] = img;
      });
      return false;
    };
  };

  get isOriginalLanguage() {
    return this.selectedLanguage === ORIGINAL_LANGUAGE;
  }

  get introTitles() {
    return this.introForm.controls['introTitles'] as FormArray;
  }

  get advertises() {
    return this.introForm.controls['advertises'] as FormArray;
  }

  get advertiseTitle() {
    return this.introTitles.controls[0].get('title') as FormControl;
  }

  get statistics() {
    return this.introForm.controls['statistics'] as FormArray;
  }

  get statisticTitle() {
    return this.introTitles.controls[1].get('title') as FormControl;
  }
}
