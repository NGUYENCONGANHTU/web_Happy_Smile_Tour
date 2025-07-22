import { Component, Input } from '@angular/core';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  ],
})
export class ReviewSummaryComponent {
  @Input() averageRate = 4.9;
  @Input() totalReviews = 60;
  @Input() ratingList = [
    { star: 5, percent: 93, count: 56 },
    { star: 4, percent: 7, count: 4 },
    { star: 3, percent: 0, count: 0 },
    { star: 2, percent: 0, count: 0 },
    { star: 1, percent: 0, count: 0 },
  ];
}
