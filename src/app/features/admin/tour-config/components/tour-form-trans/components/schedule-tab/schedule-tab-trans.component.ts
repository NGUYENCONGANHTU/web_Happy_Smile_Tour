import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';
import { CkeditorWrapperComponent } from '../../../../../../../shared/components/ckeditor-wrapper/ckeditor-wrapper.component';

@Component({
  selector: 'app-tour-form-schedule-tab-trans',
  templateUrl: 'schedule-tab-trans.component.html',
  standalone: true,
  imports: [
    NzCollapseModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    CkeditorWrapperComponent,
  ],
})
export class ScheduleTabTransComponent {
  fb = inject(FormBuilder);

  @Input({ required: true }) scheduleForm!: FormGroup;
  @Input({ required: true }) scheduleFormTrans!: FormGroup;

  @Output() saved = new EventEmitter();

  get schedules(): FormArray {
    return this.scheduleForm.get('schedules') as FormArray;
  }

  protected readonly BaseFormMode = BaseFormMode;
}
