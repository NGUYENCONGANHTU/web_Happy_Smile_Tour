import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  CONTENT_DATA_OPTIONS,
  ORIGINAL_LANGUAGE,
} from '../../../../../../../shared/constants/global.constant';
import {
  ContentConfigService,
  ContentResDTO,
} from '../../content-config.service';
import { ValidationMessagePipe } from '../../../../../../../shared/pipes/validation.pipe';

interface ExtendedInterface extends ContentResDTO {
  languageCode: string;
}

@Component({
  selector: 'app-view-content',
  templateUrl: 'view-content.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzImageModule,
    NzButtonModule,
    NzIconModule,
    ValidationMessagePipe,
  ],
})
export class ViewContentComponent implements OnInit {
  readonly nzModalData: ExtendedInterface = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);
  fb = inject(FormBuilder);
  router = inject(Router);
  contentConfigService = inject(ContentConfigService);

  submitting = false;
  contentForm: FormGroup = this.fb.group({
    key: [{ value: '', disabled: !!this.nzModalData }, [Validators.required]],
    value: ['', [Validators.required]],
    active: [
      {
        value: false,
        disabled: this.nzModalData && !this.isOriginalLanguage,
      },
      [Validators.required],
    ],
    menuId: [''],
    menuType: ['', [Validators.required]],
  });
  contentOptions = CONTENT_DATA_OPTIONS;
  activeOptions = [
    { value: true, label: 'Hoạt động' },
    { value: false, label: 'Không hoạt động' },
  ];

  ngOnInit() {
    if (this.nzModalData) {
      this.contentForm.patchValue(this.nzModalData);
      this.contentForm.updateValueAndValidity();
    }
  }

  handleCreate() {
    if (this.contentForm.valid) {
      this.submitting = true;
      this.contentConfigService
        .createContent(this.contentForm.value)
        .subscribe({
          next: () => {
            this.submitting = false;
            this.#modal.triggerOk();
          },
          error: () => {
            this.submitting = false;
          },
        });
    } else {
      this.contentForm.markAsTouched();
    }
  }

  handleUpdate() {
    if (this.contentForm.valid) {
      this.submitting = true;
      if (this.isOriginalLanguage) {
        this.contentConfigService
          .updateContentById(
            this.nzModalData.menuId,
            this.contentForm.getRawValue()
          )
          .subscribe({
            next: () => {
              this.submitting = false;
              this.#modal.triggerOk();
            },
            error: () => {
              this.submitting = false;
            },
          });
      } else {
        if (this.nzModalData.created) {
          this.contentConfigService
            .updateContentTransById(
              this.nzModalData.id,
              this.contentForm.getRawValue()
            )
            .subscribe({
              next: () => {
                this.submitting = false;
                this.#modal.triggerOk();
              },
              error: () => {
                this.submitting = false;
              },
            });
        } else {
          this.contentConfigService
            .createContentTrans({
              ...this.contentForm.value,
              languageCode: this.nzModalData?.languageCode,
            })
            .subscribe({
              next: () => {
                this.submitting = false;
                this.#modal.triggerOk();
              },
              error: () => {
                this.submitting = false;
              },
            });
        }
      }
    } else {
      this.contentForm.markAsTouched();
    }
  }

  get isOriginalLanguage() {
    return this.nzModalData?.languageCode === ORIGINAL_LANGUAGE;
  }

  protected readonly selectedLanguage = ORIGINAL_LANGUAGE;
}
