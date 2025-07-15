import { Component } from '@angular/core';
import { TourFormComponent } from '../../../../components/tour-form/pages/tour-form.component';
import { BaseFormMode } from '../../../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-create-foreign-tour',
  templateUrl: 'create-foreign-tour.component.html',
  imports: [TourFormComponent],
  standalone: true,
})
export class CreateForeignTourComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
