import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { FeatureResDTO } from '../../../../interface';
import { AppService } from '../../../../app.service';
import { ScheduleService } from '../tab-tour-foreign-detail/schedule/schedule.service';
import { TourPriceListService } from '../tab-tour-foreign-detail/price-list/tour-price-list.service';
import { ScheduleResDTO } from '../tab-tour-foreign-detail/schedule/schedule-interface';
import {
  TourDiscountResDTO,
  TourPriceResDTO,
  TourSurchargeResDTO,
} from '../tab-tour-foreign-detail/price-list/interface-tour-price';
import { FormFeedbackDomesticComponent } from './form-feedback-domestic/form-feedback-domestic.component';
import { SidebarTourDomesticComponent } from './sidebar-tour-domestic/sidebar-tour-domestic.component';
import { PriceListDomesticComponent } from './price-list-domestic/price-list-domestic.component';
import { ScheduleDomesticComponent } from './schedule-domestic/schedule-domestic.component';
import { FeaturePlaceDomesticComponent } from './feature-place-domestic/feature-place-domestic.component';
import { SlideTourDomesticDetailComponent } from './slide-tour-domestic-detail/slide-tour-domestic-detail.component';

@Component({
  selector: 'app-tab-tour-domestic-detail',
  standalone: true,
  imports: [
    NzIconModule,
    NzDividerModule,
    NzInputModule,
    NzRateModule,
    FormsModule,
    NzCardModule,
    NzBreadCrumbModule,
    RouterLink,
    FormFeedbackDomesticComponent,
    SidebarTourDomesticComponent,
    PriceListDomesticComponent,
    ScheduleDomesticComponent,
    FeaturePlaceDomesticComponent,
    SlideTourDomesticDetailComponent,
  ],
  templateUrl: './tab-tour-domestic-detail.component.html',
  styleUrl: './tab-tour-domestic-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabTourDomesticDetailComponent implements OnInit {
  @ViewChild('diemNoiBat') diemNoiBatSection!: ElementRef;
  @ViewChild('lichTrinh') lichTrinhSection!: ElementRef;
  @ViewChild('bangGia') bangGiaSection!: ElementRef;
  @ViewChild('dichVu') dichVuSection!: ElementRef;

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

  tourServiceList = inject(TourPriceListService);
  route = inject(ActivatedRoute);
  ngOnInit() {
    this.getIdParam();
    this.getAllDataDiscount();
    this.getAllDataPrice();
    this.getAllDataSurcharge();
    this.getAllDataSchedule();
    this.getAllDataFeature();
  }

  /* ================================= ĐIỂM NỘI BẬT ======================================== */
  appService = inject(AppService);
  dataFeaturePlace: FeatureResDTO[] = [];
  getAllDataFeature() {
    this.appService.getAllDataTourFeature4().subscribe(data => {
      this.dataFeaturePlace = data;
    });
  }
  tourId = 0;
  tourDetail: FeatureResDTO | null = null;
  getDataByIdTourDetail() {
    this.appService.getDataTourFeatureById4(this.tourId).subscribe(data => {
      this.tourDetail = data;
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

  /* ================================= LỊCH TRÌNH ======================================== */
  tourSchedule = inject(ScheduleService);
  dataTourSchedule: ScheduleResDTO[] = [];
  getAllDataSchedule() {
    this.tourSchedule.getAlLDataTourSchedule().subscribe(data => {
      this.dataTourSchedule = data;
    });
  }

  /* ================================= BẢNG GIÁ ======================================== */
  //
  dataTourDiscount: TourDiscountResDTO[] = [];
  getAllDataDiscount() {
    this.tourServiceList.getAlLDataTourDiscount().subscribe(data => {
      this.dataTourDiscount = data;
    });
  }
  // Bảng giá
  dataTourPrice: TourPriceResDTO[] = [];
  getAllDataPrice() {
    this.tourServiceList.getAlLDataTourPrice().subscribe(data => {
      this.dataTourPrice = data;
    });
  }
  // Phụ giá
  dataTourSurcharge: TourSurchargeResDTO[] = [];
  getAllDataSurcharge() {
    this.tourServiceList.getAlLDataTourSurcharge().subscribe(data => {
      this.dataTourSurcharge = data;
    });
  }
}
