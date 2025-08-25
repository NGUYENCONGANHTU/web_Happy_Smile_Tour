import { Component, Input } from '@angular/core';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { fakeData } from '../../../constant';

export interface IRating {
  star: number;
  percent: number;
  count: number;
}

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  standalone: true,
  imports: [
    NzRateModule,
    NzProgressModule,
    NzButtonModule,
    FormsModule,
    NzIconModule,
    TranslatePipe,
  ],
})
export class ReviewSummaryComponent {
  @Input() averageRate = 5;
  @Input() totalReviews = 0;
  @Input() ratingList: IRating[] = [];

  translateTourDetail = fakeData.tab_tour_detail;
}
