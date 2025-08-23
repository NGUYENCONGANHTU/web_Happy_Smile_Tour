import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {LocationConfigService} from '../../location-config.service';
import {LocationResDTO} from '../../location-config.interface';
import {LocationType} from '../../../../../../interface';
import {ORIGINAL_LANGUAGE} from '../../../../../shared/constants/global.constant';
import {ValidationMessagePipe} from '../../../../../shared/pipes/validation.pipe';

interface ExtendedData extends LocationResDTO {
  languageCode: string;
}

@Component({
  selector: 'app-view-client-opinion-content',
  templateUrl: 'view-location-content.component.html',
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
export class ViewLocationContentComponent implements OnInit {
  readonly nzModalData: ExtendedData = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);
  fb = inject(FormBuilder);
  router = inject(Router);
  locationService = inject(LocationConfigService);

  submitting = false;
  locationForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    locationType: ['', [Validators.required]],
  });
  options = [
    { value: LocationType.DOMESTIC, label: 'Trong nước' },
    { value: LocationType.INTERNATIONAL, label: 'Quốc tế' },
  ];

  ngOnInit() {
    if (this.nzModalData) {
      this.locationForm.patchValue(this.nzModalData);
    }
  }

  handleCreate() {
    if (this.locationForm.valid) {
      this.submitting = true;
      this.locationService.createLocation(this.locationForm.value).subscribe({
        next: () => {
          this.submitting = false;
          this.#modal.triggerOk();
        },
        error: () => {
          this.submitting = false;
        },
      });
    } else {
      this.locationForm.markAsTouched();
    }
  }

  handleUpdate() {
    if (this.locationForm.valid) {
      this.submitting = true;
      if (this.nzModalData?.languageCode === ORIGINAL_LANGUAGE) {
        this.locationService
          .updateLocationById(
            this.nzModalData.locationId,
            this.locationForm.value
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
          this.locationService
            .updateLocationTransById(
              this.nzModalData.id,
              this.locationForm.value
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
          this.locationService
            .createLocationTrans({
              ...this.locationForm.value,
              languageCode: this.nzModalData?.languageCode,
              locationId: this.nzModalData.locationId
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
      this.locationForm.markAsTouched();
    }
  }

  protected readonly selectedLanguage = ORIGINAL_LANGUAGE;
}
