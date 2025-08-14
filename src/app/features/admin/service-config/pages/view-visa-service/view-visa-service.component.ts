import { Component } from '@angular/core';
import { VisaServiceFormComponent } from '../../components/visa-service-form/visa-service-form.component';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-view-visa-service',
  templateUrl: 'view-visa-service.component.html',
  imports: [VisaServiceFormComponent],
  standalone: true,
})
export class ViewVisaServiceComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
