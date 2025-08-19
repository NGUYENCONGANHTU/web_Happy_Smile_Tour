import { Component, inject, OnInit } from '@angular/core';
import { ClientContactResDTO } from '../../client-contact.interface';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-view-client-contact-content',
  templateUrl: 'view-client-contact-content.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule],
})
export class ViewClientContactContentComponent implements OnInit {
  readonly nzModalData: ClientContactResDTO = inject(NZ_MODAL_DATA);
  fb = inject(FormBuilder);

  clientContactForm: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    name: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }],
    phone: [{ value: '', disabled: true }],
    company: [{ value: '', disabled: true }],
    number_of_people: [{ value: '', disabled: true }],
    expected_date: [{ value: '', disabled: true }],
    budget: [{ value: '', disabled: true }],
    location: [{ value: '', disabled: true }],
    message: [{ value: '', disabled: true }],
  });

  ngOnInit() {
    this.clientContactForm.patchValue(this.nzModalData);
  }
}
