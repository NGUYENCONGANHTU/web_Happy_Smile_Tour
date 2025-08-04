import { Component, inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';

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
  ],
})
export class ScheduleTabTransComponent {
  fb = inject(FormBuilder);

  @Input({ required: true }) scheduleForm!: FormGroup;
  @Input({ required: true }) scheduleFormTrans!: FormGroup;

  createItem(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addSchedule(index?: number) {
    this.schedules.insert(index ?? 0, this.createItem());
    this.schedules.updateValueAndValidity();
  }

  removeSchedule(index: number) {
    this.schedules.removeAt(index);
  }

  swapSchedules(index1: number, index2: number) {
    if (
      index1 === index2 ||
      index1 < 0 ||
      index2 < 0 ||
      index1 >= this.schedules.length ||
      index2 >= this.schedules.length
    ) {
      return; // Prevent invalid swaps
    }
    const controls = this.schedules.controls;
    // Swap the controls
    const temp = controls[index1];
    controls[index1] = controls[index2];
    controls[index2] = temp;
    // Trigger change detection
    this.schedules.updateValueAndValidity();
  }

  get schedules(): FormArray {
    return this.scheduleForm.get('schedules') as FormArray;
  }

  protected readonly BaseFormMode = BaseFormMode;
}
