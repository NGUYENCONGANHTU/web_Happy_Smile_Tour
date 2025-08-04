import { Component } from '@angular/core';
import { TourFormTransComponent } from '../../components/tour-form-trans/pages/tour-form-trans.component';

@Component({
  selector: 'app-update-tour-trans',
  templateUrl: 'update-tour-trans.component.html',
  imports: [TourFormTransComponent],
  standalone: true,
})
export class UpdateTourTransComponent {}
