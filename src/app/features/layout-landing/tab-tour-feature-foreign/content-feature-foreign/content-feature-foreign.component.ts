import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO } from '../../../../../interface';
import { FilterTourService } from '../../tab-tour-feature-domestic/filter-tour.service';
import { DecimalPipe, NgClass } from '@angular/common';
import { AppService } from '../../../../../app.service';
import { RouterLink } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';
import {
  TranslationResponse,
  TranslationService,
} from '../../translation.service';
import { TranslatePipe } from '../../translatepipe';
@Component({
  selector: 'app-content-feature-foreign',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass,
    DecimalPipe,
    RouterLink,
    NzPaginationModule,
    TranslatePipe,
  ],
  templateUrl: './content-feature-foreign.component.html',
  styleUrl: './content-feature-foreign.component.scss',
})
export class ContentFeatureForeignComponent implements OnInit, OnChanges {
  faStar = faStar; // icon
  filterTourService = inject(FilterTourService); // service Filter
  appService = inject(AppService); //App service
  formatImage = sanitizeUrl; // Format Image
  @Input() filterParams: any;
  tours: FeatureResDTO[] = [];

  //=============== Phân trang =================
  page = 1;
  pageSize = 10;
  total = 0;
  ngOnInit() {
    this.getDataTransitionTour();
  }
  ngOnChanges() {
    this.page = 1;
    this.loadTours();
  }
  loadTours() {
    const params = {
      type: 'INTERNATIONAL',
      startingPosition: this.filterParams.departure || '',
      locationId: this.filterParams.destination || '',
      min: this.filterParams.min || 0,
      max: this.filterParams.max || 200000000,
      page: this.page - 1,
      size: this.pageSize,
    };
    if (params) {
      this.filterTourService.filterTours(params).subscribe(res => {
        this.tours = res.data.content;
        this.total = res.data.totalElements;
      });
    }
  }
  onPageChange(page: number) {
    this.page = page;
    this.loadTours();
  }

  // service Language
  transitionService = inject(TranslationService);
  dataTrans: TranslationResponse['data'] | null = null;

  getDataTransitionTour() {
    this.transitionService.getDataTransLate().subscribe(res => {
      this.dataTrans = res.data;
    });
  }
}
