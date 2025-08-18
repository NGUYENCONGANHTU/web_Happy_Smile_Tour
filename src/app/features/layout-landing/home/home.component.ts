import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FeatureActionComponent } from './feature-action/feature-action.component';
import { TabsForeignTourComponent } from './tabs-foreign-tour/tabs-foreign-tour.component';
import { TabsDomesticTourComponent } from './tabs-domestic-tour/tabs-domestic-tour.component';
import { TourFeatureForeignComponent } from './tour-feature-foreign/tour-feature-foreign.component';
import { TourFeatureDomesticComponent } from './tour-feature-domestic/tour-feature-domestic.component';
import { TravelHandbookComponent } from './travel-handbook/travel-handbook.component';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { FeatureCustomerComponent } from './feature-customer/feature-customer.component';
import { AppService } from '../../../../app.service';
import {
  CommentFeedbackResDTO,
  FeatureResDTO,
  BannerResDTO,
  HomeTitleResDTO,
  LocationResDTO,
  PartnerResDTO,
  TravelGuideResDTO,
} from '../../../../interface';
import { BANNER_WEB } from '../../../shared/constants/global.constant';
import { sanitizeUrl } from '../../../shared/utils/helpers/common.helper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzCarouselModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NgStyle,
    FeatureActionComponent,
    TabsForeignTourComponent,
    TabsDomesticTourComponent,
    TourFeatureForeignComponent,
    TourFeatureDomesticComponent,
    TravelHandbookComponent,
    CustomerFeedbackComponent,
    FeatureCustomerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [
    `
      [nz-carousel-content] {
        display: flex !important;
        justify-content: center;
        align-items: center;
        height: 480px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }

      h3 {
        color: #fff;
        margin-bottom: 0;
        user-select: none;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  //service
  appService = inject(AppService);

  array = BANNER_WEB;

  ngOnInit() {
    this.getAllData();
    this.getAlLDataTitle();
    this.getAlLDataLocationInternational();
    this.getAllDataLocationDomestic();
    this.getAllDataNews();
    this.getAllDataCommentFeedBack();
    this.getAllDataPartner();
  }
  // Hàm biến đổi url từ BE trả về
  sanitizeUrl = sanitizeUrl;

  /*========================== Home Banner =============================*/
  dataBannerHome: BannerResDTO[] = [];
  getAllData() {
    this.appService.getAlLDataBannerHome().subscribe(res => {
      this.dataBannerHome = res.data;
    });
  }

  /*========================== TIÊU ĐỀ TRANG CHỦ =============================*/
  dataHomeTitle: HomeTitleResDTO[] = [];
  getAlLDataTitle() {
    this.appService.getAlLDataTitle().subscribe(res => {
      this.dataHomeTitle = res.data;
    });
  }

  /*========================== LOCATION  FOREIGN TOUR =============================*/
  dataTourForeign: FeatureResDTO[] = [];
  tabsForeignTour: LocationResDTO[] = [];
  selectedTabForeignTour!: LocationResDTO;

  // hàm lấy tất cả các quốc gia ở ngoài nước
  getAlLDataLocationInternational() {
    this.appService.getAlLDataLocationInternational().subscribe(res => {
      this.tabsForeignTour = res.data;
      this.selectedTabForeignTour = res.data[0];
      this.changeTabNameForeignTour(res.data[0].locationId);
    });
  }
  // hàm thay đổi tab và cũng là để gửi về serve khi mình quốc gia nào
  handleChangeForeignTour(tabName: string) {
    const selectedTab = this.tabsForeignTour.find(tab => tab.name === tabName);
    if (selectedTab) {
      this.selectedTabForeignTour = selectedTab;
      this.changeTabNameForeignTour(selectedTab.locationId);
    }
  }
  // thay đổi tab thì lấy dữ liệu của tab đó
  changeTabNameForeignTour(id: number) {
    this.appService.changeTabForeign(id).subscribe(res => {
      if (res?.data) {
        this.dataTourForeign = res?.data?.content;
      } else {
        this.dataTourForeign = [];
      }
    });
  }

  /*========================== LOCATION DOMESTIC =============================*/
  dataTourDomestic: FeatureResDTO[] = [];
  tabsDomesticTour: LocationResDTO[] = [];
  selectedTabDomesticTour!: LocationResDTO;

  getAllDataLocationDomestic() {
    this.appService.getAlLDataLocationDomestic().subscribe(res => {
      if (res.data.length > 0) {
        this.tabsDomesticTour = res.data;
        this.selectedTabDomesticTour = res.data[0];
        this.changeTabNameDomesticTour(res.data[0].locationId);
      }
    });
  }

  handleChangeDomesticTour(tabName: string) {
    this.selectedTabDomesticTour = this.tabsDomesticTour.find(
      tab => tab.name === tabName
    )!;

    this.changeTabNameDomesticTour(this.selectedTabDomesticTour.locationId);
  }

  changeTabNameDomesticTour(id: number) {
    this.appService.changeTabDomestic(id).subscribe(res => {
      this.dataTourDomestic = res.data.content ?? [];
    });
  }

  /*========================== CẨM NANG DU LỊCH =============================*/
  featureNews!: TravelGuideResDTO;
  featureLeftNews: TravelGuideResDTO[] = [];
  featureRightNews: TravelGuideResDTO[] = [];

  getAllDataNews() {
    this.appService.getAllDataTravelGuide().subscribe(res => {
      if (res?.data) {
        this.featureNews = res.data[0];
        this.featureLeftNews = res.data.slice(1, 4);
        this.featureRightNews = res.data.slice(4, 10);
      }
    });
  }

  /*========================== KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI =============================*/
  dataCustomerFeedback: CommentFeedbackResDTO[] = [];

  getAllDataCommentFeedBack() {
    this.appService.getAllDataCommentFeedback().subscribe(res => {
      if (res?.data) {
        this.dataCustomerFeedback = res.data;
      } else {
        this.dataCustomerFeedback = [];
      }
    });
  }
  /* ========================== KHÁCH HÀNG NỔI BẬT ============================= */
  dataPartner: PartnerResDTO[] = [];
  getAllDataPartner() {
    this.appService.getAllDataPartner().subscribe(res => {
      if (res?.data) {
        this.dataPartner = res.data;
      } else {
        this.dataPartner = [];
        console.warn('Dữ liệu không có hoặc trả về null');
      }
    });
  }
  private sanitizer = inject(DomSanitizer);
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
