import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DEFAULT_FALLBACK } from '../../../../../../../shared/constants/global.constant';
import { ClientOpinionResDTO } from '../../client-opinion.interface';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { getBase64 } from '../../../../../../../shared/utils/helpers/common.helper';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';
import { ClientOpinionService } from '../../client-opinion.service';

interface extendedClientOpinion extends ClientOpinionResDTO {
  imageUrl: string;
}

@Component({
  selector: 'app-view-client-opinion-content',
  templateUrl: 'view-client-opinion-content.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzImageModule,
    NzButtonModule,
    NzIconDirective,
    NzUploadComponent,
  ],
})
export class ViewClientOpinionContentComponent implements OnInit {
  readonly nzModalData: extendedClientOpinion = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);
  fb = inject(FormBuilder);
  router = inject(Router);
  clientOpinionService = inject(ClientOpinionService);

  submitting = false;

  imgPreview = '';
  clientOpinionForm: FormGroup = this.fb.group({
    id: [''],
    name: [''],
    // rate: [{ value: 0, disabled: true }],
    content: [''],
    image: [null],
    description: [''],
  });

  ngOnInit() {
    if (this.nzModalData) {
      this.clientOpinionForm.patchValue(this.nzModalData);
      this.imgPreview = this.nzModalData.imageUrl;
    }
  }

  handleCreate() {
    this.submitting = true;
    this.clientOpinionService
      .createClientOpinion(this.clientOpinionForm.value)
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

  handleUpdate() {
    this.submitting = true;
    this.clientOpinionService
      .updateClientOpinionById(
        this.clientOpinionForm.value?.id,
        this.clientOpinionForm.value
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
  }

  beforeUpload = (file: NzUploadFile) => {
    this.clientOpinionForm.patchValue({ image: file });
    getBase64(file as unknown as File, (img: string) => {
      this.imgPreview = img;
    });
    return false;
  };

  protected readonly DEFAULT_FALLBACK = DEFAULT_FALLBACK;
  protected readonly BaseFormMode = BaseFormMode;
}
