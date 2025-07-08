import { Component, inject, Input, OnChanges } from '@angular/core';
import {
  faStar,
  faCalendarDays,
  faLocationDot,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO } from '../../../../../interface';
import { FilterTourService } from '../filter-tour.service';
@Component({
  selector: 'app-content-feature-domestic',
  imports: [FaIconComponent],
  templateUrl: './content-feature-domestic.component.html',
  styleUrl: './content-feature-domestic.component.scss',
})
export class ContentFeatureDomesticComponent implements OnChanges {
  faStar = faStar;
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  faAngleRight = faAngleRight;

  @Input() filterParams: any;
  tours: FeatureResDTO[] = [];

  filterTourService = inject(FilterTourService);

  ngOnChanges() {
    if (this.filterParams) {
      this.filterTourService.getTours(this.filterParams).subscribe(data => {
        this.tours = data;
      });
    }
  }
}
