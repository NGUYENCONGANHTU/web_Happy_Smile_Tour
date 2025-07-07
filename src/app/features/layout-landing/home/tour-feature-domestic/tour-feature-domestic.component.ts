import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faLocationDot,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { FeatureResDTO, LocationResDTO } from '../../../../../interface';
@Component({
  selector: 'app-tour-feature-domestic',
  imports: [FaIconComponent, DecimalPipe],
  templateUrl: './tour-feature-domestic.component.html',
  styleUrl: './tour-feature-domestic.component.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourFeatureDomesticComponent {
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  faStar = faStar;

  @Input() selectedTabDomesticTour!: LocationResDTO;
  @Input() dataDomesticTour: FeatureResDTO[] = [];
}
