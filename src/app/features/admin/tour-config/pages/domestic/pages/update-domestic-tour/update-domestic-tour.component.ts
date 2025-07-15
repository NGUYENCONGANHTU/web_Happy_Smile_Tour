import { Component } from '@angular/core';
import { TourFormComponent } from '../../../../components/tour-form/pages/tour-form.component';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-update-foreign-tour',
  templateUrl: 'update-domestic-tour.component.html',
  imports: [TourFormComponent],
  standalone: true,
})
export class UpdateDomesticTourComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
