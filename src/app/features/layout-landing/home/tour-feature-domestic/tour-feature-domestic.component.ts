import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCalendarDays, faLocationDot, faStar} from '@fortawesome/free-solid-svg-icons';
import {DecimalPipe, NgForOf} from '@angular/common';
import {FeatureResDTO, LocationResDTO} from '../../../../../interface';
@Component({
  selector: 'app-tour-feature-domestic',
  imports: [
    FaIconComponent,
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './tour-feature-domestic.component.html',
  styleUrl: './tour-feature-domestic.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TourFeatureDomesticComponent {
  faCalendarDays = faCalendarDays
  faLocationDot=faLocationDot
  faStar = faStar;


  @Input() selectedTabDomesticTour!: LocationResDTO;
  @Input() dataDomesticTour: FeatureResDTO[] = [];
}
