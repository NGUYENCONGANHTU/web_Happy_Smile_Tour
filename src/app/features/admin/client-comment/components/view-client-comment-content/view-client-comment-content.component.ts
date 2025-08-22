import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ClientCommentResDTO } from '../../client-comment.interface';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DEFAULT_FALLBACK } from '../../../../../shared/constants/global.constant';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-client-contact-content',
  templateUrl: 'view-client-comment-content.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzImageModule,
    NzButtonModule,
  ],
})
export class ViewClientCommentContentComponent implements OnInit {
  readonly nzModalData: ClientCommentResDTO = inject(NZ_MODAL_DATA);
  fb = inject(FormBuilder);
  router = inject(Router);

  clientCommentForm: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    name: [{ value: '', disabled: true }],
    rate: [{ value: 0, disabled: true }],
    tags: [{ value: [], disabled: true }],
    content: [{ value: '', disabled: true }],
    imageUrl: [{ value: '', disabled: true }],
    time: [{ value: '', disabled: true }],
    tourId: [{ value: '', disabled: true }],
  });

  ngOnInit() {
    this.clientCommentForm.patchValue(this.nzModalData);
  }

  goToDetail() {
    this.router.navigateByUrl(
      `/admin/tour-config/${this.clientCommentForm.value?.id}`
    );
  }

  protected readonly DEFAULT_FALLBACK = DEFAULT_FALLBACK;
}
