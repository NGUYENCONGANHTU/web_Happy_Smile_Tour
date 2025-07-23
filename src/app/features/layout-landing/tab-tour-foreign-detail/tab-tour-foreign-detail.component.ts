import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FeaturePlaceComponent } from './feature-place/feature-place.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PriceListComponent } from './price-list/price-list.component';
import { SidebarTabTourForeignComponent } from './sidebar-tab-tour-foreign/sidebar-tab-tour-foreign.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormFeedbackComponent } from './form-feedback/form-feedback.component';
import { FeatureResDTO } from '../../../../interface';
import { AppService } from '../../../../app.service';
import { ReviewSummaryComponent } from '../../../shared/components/review-summary/review-summary.component';
import { ReviewListComponent } from '../../../shared/components/review-list/review-list.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SlideTourDetailComponent } from './slide-tour-detail/slide-tour-detail.component';

@Component({
  selector: 'app-tab-tour-foreign-detail',
  standalone: true,
  imports: [
    NzIconModule,
    NzDividerModule,
    NzInputModule,
    NzRateModule,
    FormsModule,
    NzCardModule,
    FeaturePlaceComponent,
    ScheduleComponent,
    PriceListComponent,
    SidebarTabTourForeignComponent,
    NzBreadCrumbModule,
    RouterLink,
    FormFeedbackComponent,
    ReviewSummaryComponent,
    ReviewListComponent,
    TranslatePipe,
    SlideTourDetailComponent,
  ],
  templateUrl: './tab-tour-foreign-detail.component.html',
  styleUrl: './tab-tour-foreign-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabTourForeignDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('diemNoiBat') diemNoiBatSection!: ElementRef;
  @ViewChild('lichTrinh') lichTrinhSection!: ElementRef;
  @ViewChild('bangGia') bangGiaSection!: ElementRef;
  @ViewChild('dichVu') dichVuSection!: ElementRef;

  activeSection = 'section1';

  ngAfterViewInit() {
    setTimeout(() => {
      this.onWindowScroll();
    }, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const offset = 100;

    let currentActiveSection: string | null = null;
    [
      this.diemNoiBatSection,
      this.lichTrinhSection,
      this.bangGiaSection,
      this.dichVuSection,
    ].forEach((sectionRef: ElementRef) => {
      const sectionElement: HTMLElement = sectionRef?.nativeElement; // Get the native DOM element
      const rect = sectionElement.getBoundingClientRect();
      const sectionTop = rect.top + scrollPosition;
      const sectionBottom = rect.bottom + scrollPosition;
      if (
        scrollPosition + offset >= sectionTop &&
        scrollPosition + offset < sectionBottom
      ) {
        currentActiveSection = sectionElement.id;
      }
    });
    if (currentActiveSection && this.activeSection !== currentActiveSection) {
      this.activeSection = currentActiveSection;
    }
  }

  scrollTo(section: string) {
    switch (section) {
      case 'diemNoiBat':
        this.diemNoiBatSection.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 'lichTrinh':
        this.lichTrinhSection.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 'bangGia':
        this.bangGiaSection.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 'dichVu':
        this.dichVuSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }

  route = inject(ActivatedRoute);
  ngOnInit() {
    this.getIdParam();
    this.getAllDataFeature();
  }

  /* ================================= ĐIỂM NỘI BẬT ======================================== */
  appService = inject(AppService);
  dataFeaturePlace: FeatureResDTO[] = [];
  getAllDataFeature() {
    this.appService.getAllDataTourFeature4().subscribe(res => {
      this.dataFeaturePlace = res.data.content;
    });
  }
  tourId = 0;
  tourDetail: FeatureResDTO | null = null;
  getDataByIdTourDetail() {
    this.appService.getDataTourFeatureById4(this.tourId).subscribe(res => {
      this.tourDetail = res.data;
    });
  }
  getIdParam() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.tourId = Number(idParam);
        this.getDataByIdTourDetail();
      }
    });
  }
}
