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
import { TranslatePipe } from '@ngx-translate/core';
import { DateTimeFormatPipe } from '../../../shared/pipes/date-time-format.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-tab-travel-guide-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    RouterLink,
    FaIconComponent,
    TranslatePipe,
    DateTimeFormatPipe,
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
  }
  getContentTravelGuide() {
    this.appService.getDataByIdTravelGuide(this.newsId).subscribe(res => {
      this.dataContentTravelGuide = res.data;
    });
  }
  private sanitizer = inject(DomSanitizer);
  sanitizeHtml(content?: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content ?? '');
  }
}
