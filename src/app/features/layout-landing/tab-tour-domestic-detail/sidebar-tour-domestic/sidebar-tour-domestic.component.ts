import { Component, inject, Input } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {
  faCalendarDays,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO } from '../../../../../interface';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DecimalPipe } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-sidebar-tour-domestic',
  imports: [
    NzInputModule,
    NzFormModule,
    NzDividerModule,
    FaIconComponent,
    DecimalPipe,
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sidebar-tour-domestic.component.html',
  styleUrl: './sidebar-tour-domestic.component.scss',
})
export class SidebarTourDomesticComponent {
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  @Input() tourDetail: FeatureResDTO | null = null;

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isVisible = false;

      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.isVisible = true;
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    phone: this.fb.control('', [Validators.required]),
    note: this.fb.control('', [Validators.required]),
  });
}
