import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';
import { FooterConfigService } from './footer-config.service';
import { LanguageSelectionComponent } from '../../../../../shared/components/language-selection/language-selection.component';
import { CkeditorWrapperComponent } from '../../../../../shared/components/ckeditor-wrapper/ckeditor-wrapper.component';

@Component({
  selector: 'app-footer-config',
  templateUrl: 'footer-config.component.html',
  imports: [
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    LanguageSelectionComponent,
    CkeditorWrapperComponent,
  ],
  standalone: true,
})
export class FooterConfigComponent implements OnInit {
  fb = inject(FormBuilder);
  footerService = inject(FooterConfigService);

  submitting = false;
  fetching = false;

  selectedLanguage = ORIGINAL_LANGUAGE;

  footerForm: FormGroup = this.fb.group({
    id: [''],
    footerId: [''],
    name: [''],
    position: [''],
    company: [''],
    address: [''],
    taxCode: [''],
    licenseNumber: [''],
    website: [''],
    email: [''],
    mobileNumber: [''],
    whatsappNumber: [''],
    created: [false],
  });

  ngOnInit() {
    this.fetchFooterData();
  }

  fetchFooterData() {
    this.fetching = true;
    this.footerService.getFooterTransData(this.selectedLanguage).subscribe({
      next: res => {
        if (res.data.length) {
          this.footerForm.patchValue(res.data[0]);
        }
        this.fetching = false;
      },
      error: () => {
        this.fetching = false;
      },
    });
  }

  onSubmit(_event: any) {
    if (this.footerForm.valid) {
      this.submitting = true;
      if (this.isOriginalLanguage) {
        this.footerService
          .updateFooterById(
            this.footerForm.value?.footerId,
            this.footerForm.value
          )
          .subscribe({
            next: () => {
              this.submitting = false;
            },
            error: () => {
              this.submitting = false;
            },
          });
      } else {
        this.footerService
          .updateFooterTransById(
            this.footerForm.value?.id,
            this.footerForm.value
          )
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

  get isOriginalLanguage() {
    return this.selectedLanguage === ORIGINAL_LANGUAGE;
  }
}
