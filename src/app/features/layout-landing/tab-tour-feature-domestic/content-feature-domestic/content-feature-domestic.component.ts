import { Component } from '@angular/core';
import {faStar, faCalendarDays, faLocationDot, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-content-feature-domestic',
  imports: [
    FaIconComponent
  ],
  templateUrl: './content-feature-domestic.component.html',
  styleUrl: './content-feature-domestic.component.scss'
})
export class ContentFeatureDomesticComponent {
  faStar = faStar;
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  faAngleRight= faAngleRight;
}
