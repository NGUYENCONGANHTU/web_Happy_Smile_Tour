import { Component, inject, OnInit } from '@angular/core';
import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
} from 'ng-zorro-antd/breadcrumb';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppService } from '../../../../app.service';
import { TravelGuideResDTO } from '../../../../interface';
import { DateTimeFormatPipe } from '../../../shared/pipes/date-time-format.pipe';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../translation.service';
import { TranslatePipe } from '../translatepipe';
@Component({
  selector: 'app-tab-travel-guide-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    RouterLink,
    FaIconComponent,
    DateTimeFormatPipe,
    TranslatePipe,
  ],
  templateUrl: './tab-travel-guide-detail.component.html',
  styleUrl: './tab-travel-guide-detail.component.scss',
})
export class TabTravelGuideDetailComponent implements OnInit {
  faClock = faClock;
  appService = inject(AppService);
  newsId = 0;
  dataContentTravelGuide: TravelGuideResDTO | null = null;
  route = inject(ActivatedRoute);
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.newsId = Number(idParam);
        this.getContentTravelGuide();
      }
    });
    this.getDataTransitionTour();
  }
  getContentTravelGuide() {
    this.appService.getDataByIdTravelGuide(this.newsId).subscribe(res => {
      this.dataContentTravelGuide = res.data;
    });
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
