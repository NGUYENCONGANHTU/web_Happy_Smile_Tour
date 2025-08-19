import { Component, inject, OnInit } from '@angular/core';
import { LanguageSelectionComponent } from '../../../../../shared/components/language-selection/language-selection.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';
import { IntroConfigService } from './intro-config.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-intro-config',
  templateUrl: 'intro-config.component.html',
  imports: [
    LanguageSelectionComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
  standalone: true,
})
export class IntroConfigComponent implements OnInit {
  fb = inject(FormBuilder);
  introConfigService = inject(IntroConfigService);

  submitting = false;

  selectedLanguage = ORIGINAL_LANGUAGE;
  introForm: FormGroup = this.fb.group({
    id: [''],
    introId: [''],
    title: [''],
    description: [''],
    introTitles: this.fb.array([]),
    advertises: this.fb.array([]),
    statistic: this.fb.array([]),
    created: [false],
  });

  ngOnInit() {
    this.fetchAllData();
  }

  fetchAllData() {
    this.fetchIntro();
  }

  fetchIntro() {
    this.introConfigService.getIntroDataTrans(this.selectedLanguage).subscribe({
      next: res => {
        if (res.data?.length) {
          this.introForm.patchValue(res.data[0]);
        }
      },
    });
  }

  onSubmit(_event: SubmitEvent) {
    if (this.introForm.valid) {
      this.submitting = true;
      if (this.isOriginalLanguage) {
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
      } else {
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
    }
  }

  get isOriginalLanguage() {
    return this.selectedLanguage === ORIGINAL_LANGUAGE;
  }
}
