import { Component, inject, Input } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TimeSincePipe } from '../../pipes/time-since.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TourCommentDetailResDTO } from '../../../../interface';

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
    TranslatePipe,
  ],
})
export class ReviewListComponent {
  translateService = inject(TranslateService);

  @Input() reviews: TourCommentDetailResDTO[] = [];

  selectedFilter = 'all';
  filters = [
    { key: 'all', label: this.translateService.instant('tour_detail.all') },
    {
      key: '5',
      label: `5 ${this.translateService.instant('tour_detail.stars').toLowerCase()}`,
    },
    {
      key: '4',
      label: `4 ${this.translateService.instant('tour_detail.stars').toLowerCase()}`,
    },
    {
      key: '3',
      label: `3 ${this.translateService.instant('tour_detail.stars').toLowerCase()}`,
    },
    {
      key: '2',
      label: `2 ${this.translateService.instant('tour_detail.stars').toLowerCase()}`,
    },
    {
      key: '1',
      label: `1 ${this.translateService.instant('tour_detail.stars').toLowerCase()}`,
    },
  ];

  get filteredReviews(): TourCommentDetailResDTO[] {
    if (this.selectedFilter === 'all') return this.reviews;
    return this.reviews.filter(
      r => r?.rate?.toString() === this.selectedFilter
    );
  }

  onFilter(key: string): void {
    this.selectedFilter = key;
  }
}
