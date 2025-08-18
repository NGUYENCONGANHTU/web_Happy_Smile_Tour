import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  LanguageConfigService,
  LanguageResDTO,
} from '../../language-config.service';
import {
  getBase64,
  parseToNzUploadFile,
  sanitizeUrl,
} from '../../../../../shared/utils/helpers/common.helper';

@Component({
  selector: 'app-language-form',
  templateUrl: 'language-form.component.html',
  imports: [
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzUploadModule,
    ReactiveFormsModule,
    NzButtonComponent,
  ],
  standalone: true,
})
export class LanguageFormComponent implements OnChanges {
  @Input({ required: true }) mode!: BaseFormMode;
  @Input() data?: LanguageResDTO;

  fb = inject(FormBuilder);
  languageService = inject(LanguageConfigService);

  submitting = false;

  languageForm: FormGroup = this.fb.group({
    name: [''],
    code: [''],
    image: [null],
  });

  imgPreview = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.languageForm.patchValue({
        ...this.data,
        image: this.data?.image
          ? parseToNzUploadFile(
              this.data.image?.storagePath,
              this.data.image?.id
            )
          : null,
      });
      this.imgPreview = sanitizeUrl(this.data.image?.storagePath ?? '');
    }
    console.log('this.data: ', this.languageForm);
  }

  onSubmit(_event: SubmitEvent) {
    if (this.languageForm.valid) {
      this.submitting = true;
      switch (this.mode) {
        case BaseFormMode.CREATE:
          this.languageService
            .createLanguage(this.languageForm.value)
            .subscribe({
              next: () => {
                this.submitting = false;
              },
              error: () => {
                this.submitting = false;
              },
            });
          break;
        case BaseFormMode.UPDATE:
          this.languageService
            .updateLanguage(this.data?.id, this.languageForm.value)
            .subscribe({
              next: () => {
                this.submitting = false;
              },
              error: () => {
                this.submitting = false;
              },
            });
      }
    } else {
      this.languageForm.markAllAsTouched();
    }
  }

  beforeUpload = (file: NzUploadFile) => {
    this.languageForm.patchValue({ image: file });
    getBase64(file as unknown as File, (img: string) => {
      this.imgPreview = img;
    });
    return false;
  };

  protected readonly BaseFormMode = BaseFormMode;
}
