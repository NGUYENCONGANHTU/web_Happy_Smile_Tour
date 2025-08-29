import { Component, inject, OnInit } from '@angular/core';
import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
} from 'ng-zorro-antd/breadcrumb';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppService } from '../../../../app.service';
import { TravelGuideResDTO } from '../../../../interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../translation.service';

@Component({
  selector: 'app-tab-tour-travel-guide-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    RouterLink,
    FaIconComponent,
  ],
  templateUrl: './tab-tour-travel-guide-detail.component.html',
  styleUrl: './tab-tour-travel-guide-detail.component.scss',
})
export class TabTourTravelGuideDetailComponent implements OnInit {
  faClock = faClock;
  newsId = 0;
  appService = inject(AppService);

  route = inject(ActivatedRoute);
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.newsId = Number(idParam);
        this.getContentTravelGuideDetail();
      }
    });
    this.getDataTransitionTour();
  }
  dataContentTravelGuide: TravelGuideResDTO | null = null;
  getContentTravelGuideDetail() {
    this.appService.getDataByIdTravelGuide(this.newsId).subscribe({
      next: res => {
        this.dataContentTravelGuide = res.data;
      },
      error: err => {
        console.error('Error loading news detail:', err);
      },
    });
  }

  private sanitizer = inject(DomSanitizer);
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
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
