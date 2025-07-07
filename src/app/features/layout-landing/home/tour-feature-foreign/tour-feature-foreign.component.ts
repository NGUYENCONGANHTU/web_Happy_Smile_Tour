import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import {
  faCalendarDays,
  faLocationDot,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO, LocationResDTO } from '../../../../../interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-tour-feature-foreign',
  imports: [FaIconComponent, DecimalPipe],
  standalone: true,
  templateUrl: './tour-feature-foreign.component.html',
  styleUrl: './tour-feature-foreign.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourFeatureForeignComponent {
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  faStar = faStar;

  @Input() selectedTabForeignTour!: LocationResDTO;
  @Input() dataTour: FeatureResDTO[] = [];
}
