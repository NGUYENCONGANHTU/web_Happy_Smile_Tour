import { Component, inject, Input, OnInit } from '@angular/core';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../../../features/layout-landing/translation.service';

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
  ],
})
export class ReviewSummaryComponent implements OnInit {
  @Input() averageRate = 5;
  @Input() totalReviews = 0;
  @Input() ratingList: IRating[] = [];

  ngOnInit() {
    this.getDataTransitionTour();
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
