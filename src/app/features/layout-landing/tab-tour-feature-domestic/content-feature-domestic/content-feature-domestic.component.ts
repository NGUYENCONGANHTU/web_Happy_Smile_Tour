import { Component, inject, Input, OnChanges } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO } from '../../../../../interface';
import { FilterTourService } from '../filter-tour.service';
import { DecimalPipe, NgClass } from '@angular/common';
import { AppService } from '../../../../../app.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { sanitizeUrl } from '../../../../shared/utils/helpers';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-content-feature-domestic',
  imports: [
    FaIconComponent,
    NgClass,
    DecimalPipe,
    RouterLink,
    TranslatePipe,
    NzPaginationComponent,
  ],
  templateUrl: './content-feature-domestic.component.html',
  styleUrl: './content-feature-domestic.component.scss',
})
export class ContentFeatureDomesticComponent implements OnChanges {
  filterTourService = inject(FilterTourService);
  appService = inject(AppService);
  faStar = faStar;
  formatImage = sanitizeUrl;
  @Input() filterParams: any;
  tours: FeatureResDTO[] = [];

  //=============== Phân trang =================
  page = 1;
  pageSize = 10;
  total = 0;

  ngOnChanges() {
    this.page = 1;
    this.loadTours();
  }
  loadTours() {
    const params = {
      type: 'DOMESTIC',
      startingPosition: this.filterParams.departure || '',
      locationId: this.filterParams.destination || '',
      min: this.filterParams.min || 0,
      max: this.filterParams.max || 200000000,
      page: this.page - 1,
      size: this.pageSize,
    };
    if (params) {
      this.filterTourService.filterTours(params).subscribe(res => {
        console.log(res);
        this.tours = res.data.content;
        this.total = res.data.totalElements;
      });
    }
  }
  onPageChange(page: number) {
    this.page = page;
    this.loadTours();
  }
}
