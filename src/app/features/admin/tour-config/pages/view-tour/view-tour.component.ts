import { Component } from '@angular/core';
import { TourFormComponent } from '../../components/tour-form/pages/tour-form.component';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-view-foreign-tour',
  templateUrl: 'view-tour.component.html',
  imports: [TourFormComponent],
  standalone: true,
})
export class ViewTourComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
