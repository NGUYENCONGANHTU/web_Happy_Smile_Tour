import { Component } from '@angular/core';
import { TourFormComponent } from '../../../../components/tour-form/pages/tour-form.component';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-create-foreign-tour',
  templateUrl: 'create-domestic-tour.component.html',
  imports: [TourFormComponent],
  standalone: true,
})
export class CreateDomesticTourComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
