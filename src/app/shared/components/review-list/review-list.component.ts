import { Component, inject, Input, OnInit } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TimeSincePipe } from '../../pipes/time-since.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateService } from '@ngx-translate/core';
import { TourCommentDetailResDTO } from '../../../../interface';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../../../features/layout-landing/translation.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  imports: [
    NzAvatarModule,
    NzRateModule,
    FormsModule,
    NzTagModule,
    TimeSincePipe,
    NzButtonModule,
  ],
})
export class ReviewListComponent implements OnInit {
  translateService = inject(TranslateService);
  @Input() reviews: TourCommentDetailResDTO[] = [];

  selectedFilter = 'all';

  get filteredReviews(): TourCommentDetailResDTO[] {
    if (this.selectedFilter === 'all') return this.reviews;
    return this.reviews.filter(
      r => r?.rate?.toString() === this.selectedFilter
    );
  }

  onFilter(key: string): void {
    this.selectedFilter = key;
  }
  ngOnInit() {
    this.getDataTransitionTour();
  }
  // service Language
  transitionService = inject(TranslationService);
  dataTrans: TranslationResponse['data'] | null = null;
  filters: { key: string; label: string }[] = [];
  getDataTransitionTour() {
    this.transitionService.getDataTransLate().subscribe(res => {
      this.dataTrans = res.data;
      this.filters = [
        { key: 'all', label: this.getTrans('tab_tour_detail', 'all') },
        {
          key: '5',
          label: `5 ${this.getTrans('tab_tour_detail', 'stars').toLowerCase()}`,
        },
        {
          key: '4',
          label: `4 ${this.getTrans('tab_tour_detail', 'stars').toLowerCase()}`,
        },
        {
          key: '3',
          label: `3 ${this.getTrans('tab_tour_detail', 'stars').toLowerCase()}`,
        },
        {
          key: '2',
          label: `2 ${this.getTrans('tab_tour_detail', 'stars').toLowerCase()}`,
        },
        {
          key: '1',
          label: `1 ${this.getTrans('tab_tour_detail', 'stars').toLowerCase()}`,
        },
      ];
    });
  }
  getTrans(key: TranslationSection, value: string, fallback = ''): string {
    return this.dataTrans?.[key]?.[value] ?? fallback;
  }
}
