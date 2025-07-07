import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { HomeTitleResDTO } from '../../../../../interface';

@Component({
  selector: 'app-feature-customer',
  imports: [],
  templateUrl: './feature-customer.component.html',
  styleUrl: './feature-customer.component.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureCustomerComponent {
  @Input() dataCustomerFeature: HomeTitleResDTO[] = [];
}
