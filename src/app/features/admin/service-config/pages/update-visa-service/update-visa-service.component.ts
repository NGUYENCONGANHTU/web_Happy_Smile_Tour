import { Component } from '@angular/core';
import { VisaServiceFormComponent } from '../../components/visa-service-form/visa-service-form.component';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-update-visa-service',
  templateUrl: 'update-visa-service.component.html',
  imports: [VisaServiceFormComponent],
  standalone: true,
})
export class UpdateVisaServiceComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
