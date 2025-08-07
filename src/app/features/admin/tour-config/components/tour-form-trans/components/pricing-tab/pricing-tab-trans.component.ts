import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { ORIGINAL_LANGUAGE } from '../../../../../../../shared/constants/global.constant';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-tour-form-pricing-tab-trans',
  templateUrl: 'pricing-tab-trans.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
    NzInputNumberModule,
  ],
})
export class PricingTabTransComponent {
  fb = inject(FormBuilder);

  @Input({ required: true }) priceForm!: FormGroup;
  @Input({ required: true }) priceFormTrans!: FormGroup;
  @Input({ required: true }) lang!: string;

  @Output() saved = new EventEmitter();

  get tourPrices(): FormArray {
    return this.priceForm.get('tourPrices') as FormArray;
  }
  get surcharges(): FormArray {
    return this.priceForm.get('surcharges') as FormArray;
  }
  get discounts(): FormArray {
    return this.priceForm.get('discounts') as FormArray;
  }

  get tourPricesTrans(): FormArray {
    return this.priceFormTrans.get('tourPrices') as FormArray;
  }
  get surchargesTrans(): FormArray {
    return this.priceFormTrans.get('surcharges') as FormArray;
  }
  get discountsTrans(): FormArray {
    return this.priceFormTrans.get('discounts') as FormArray;
  }

  get isOriginalLang() {
    return this.lang === ORIGINAL_LANGUAGE;
  }

  protected readonly BaseFormMode = BaseFormMode;
}
