import { Component } from '@angular/core';
import {
  faStar,
  faCalendarDays,
  faLocationDot,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-content-feature-foreign',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './content-feature-foreign.component.html',
  styleUrl: './content-feature-foreign.component.scss',
})
export class ContentFeatureForeignComponent {
  faStar = faStar;
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  faAngleRight = faAngleRight;
}
