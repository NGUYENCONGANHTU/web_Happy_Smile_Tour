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
import { DecimalPipe, NgClass } from '@angular/common';
import { AppService } from '../../../../../app.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { sanitizeUrl } from '../../../../shared/utils/helpers';
@Component({
  selector: 'app-content-feature-domestic',
  imports: [FaIconComponent, NgClass, DecimalPipe, RouterLink, TranslatePipe],
  templateUrl: './content-feature-domestic.component.html',
  styleUrl: './content-feature-domestic.component.scss',
})
export class ContentFeatureDomesticComponent implements OnChanges {
  faStar = faStar;
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  faAngleRight = faAngleRight;
  formatImage = sanitizeUrl;
  @Input() filterParams: any;
  tours: FeatureResDTO[] = [];

  filterTourService = inject(FilterTourService);
  appService = inject(AppService);
  ngOnChanges() {
    if (this.filterParams && Object.keys(this.filterParams).length > 0) {
      this.filterTourService.getTours(this.filterParams).subscribe(data => {
        this.tours = data;
      });
    } else {
      this.appService.getDataTourDomestic().subscribe(res => {
        this.tours = res.data.content;
      });
    }
  }
}
