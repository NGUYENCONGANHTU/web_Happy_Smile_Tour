import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO } from '../../../../../interface';
import { FilterTourService } from '../filter-tour.service';
import { DecimalPipe, NgClass } from '@angular/common';
import { AppService } from '../../../../../app.service';
import { RouterLink } from '@angular/router';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../../translation.service';
@Component({
  selector: 'app-content-feature-domestic',
  imports: [
    FaIconComponent,
    NgClass,
    DecimalPipe,
    RouterLink,
    NzPaginationComponent,
  ],
  templateUrl: './content-feature-domestic.component.html',
  styleUrl: './content-feature-domestic.component.scss',
})
export class ContentFeatureDomesticComponent implements OnInit, OnChanges {
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
  ngOnInit() {
    this.getDataTransitionTour();
  }

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
  getTrans(key: TranslationSection, value: string, fallback = ''): string {
    return this.dataTrans?.[key]?.[value] ?? fallback;
  }
}
