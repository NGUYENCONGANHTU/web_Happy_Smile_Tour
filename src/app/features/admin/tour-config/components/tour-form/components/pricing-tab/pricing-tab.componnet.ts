import { Component, inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-tour-form-pricing-tab',
  templateUrl: 'pricing-tab.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
  ],
})
export class TourFormPricingTabComponent {
  fb = inject(FormBuilder);

  @Input({ required: true }) priceForm!: FormGroup;
  @Input({ required: true }) mode!: BaseFormMode;

  get tourPrices(): FormArray {
    return this.priceForm.get('tourPrices') as FormArray;
  }
  get surcharges(): FormArray {
    return this.priceForm.get('surcharges') as FormArray;
  }
  get discounts(): FormArray {
    return this.priceForm.get('discounts') as FormArray;
  }

  addTourPrice() {
    this.tourPrices.push(this.fb.group({ name: '', age: '', price: null }));
  }

  deleteTourPrice(index: number) {
    this.tourPrices.removeAt(index);
  }

  addSurcharge() {
    this.surcharges.push(this.fb.group({ name: '', price: null, apply: '' }));
  }

  deleteSurcharge(index: number) {
    this.surcharges.removeAt(index);
  }

  addDiscount() {
    this.discounts.push(
      this.fb.group({ name: '', description: '', price: null, condition: '' })
    );
  }

  deleteDiscount(index: number) {
    this.discounts.removeAt(index);
  }

  protected readonly BaseFormMode = BaseFormMode;
}
