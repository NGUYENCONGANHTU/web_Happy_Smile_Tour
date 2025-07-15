import { Component } from '@angular/core';
import { TourFormComponent } from '../../../../components/tour-form/pages/tour-form.component';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-update-foreign-tour',
  templateUrl: 'update-foreign-tour.component.html',
  imports: [TourFormComponent],
  standalone: true,
})
export class UpdateForeignTourComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
