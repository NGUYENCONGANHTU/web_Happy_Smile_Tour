import { Component, inject, Input, OnChanges } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO } from '../../../../../interface';
import { FilterTourService } from '../../tab-tour-feature-domestic/filter-tour.service';
import { DecimalPipe, NgClass } from '@angular/common';
import { AppService } from '../../../../../app.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { sanitizeUrl } from '../../../../shared/utils/helpers';
@Component({
  selector: 'app-content-feature-foreign',
  standalone: true,
  imports: [FaIconComponent, NgClass, DecimalPipe, RouterLink, TranslatePipe],
  templateUrl: './content-feature-foreign.component.html',
  styleUrl: './content-feature-foreign.component.scss',
})
export class ContentFeatureForeignComponent implements OnChanges {
  faStar = faStar;
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
      this.appService.getDataTourForeign().subscribe(res => {
        this.tours = res.data.content;
      });
    }
  }

  protected readonly formatImage = sanitizeUrl;
}
