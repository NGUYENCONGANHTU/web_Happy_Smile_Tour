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
  HomeBannerResDTO,
  HomeTitleResDTO,
  LocationResDTO,
  TravelGuideResDTO,
} from '../../../../interface';

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

  array = [
    {
      image:
        'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,w_2560/v1744887444/banner/mtjajbd973gg6rboqqrj.webp',
    },
    {
      image:
        'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1747363626/banner/rgj9gn9qqaflkyibv2ir.webp',
    },
    {
      image:
        'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1744887428/banner/aikggh0fo0dglcieygli.webp',
    },
  ];

  ngOnInit() {
    this.getAllData();
    this.getAlLDataTitle();
    this.getAlLDataLocationInternational();
    this.getAllDataLocationDomestic();
    this.getAllDataNews();
    this.getAllDataCommentFeedBack();
  }

  /*========================== Home Banner =============================*/
  dataBannerHome: HomeBannerResDTO[] = [];
  getAllData() {
    this.appService.getAlLDataBannerHome().subscribe(res => {
      console.log(res);
      this.dataBannerHome = res.data;
    });
  }

  /*========================== Home Title =============================*/
  dataHomeTitle: HomeTitleResDTO[] = [];
  dataHomeImage: HomeTitleResDTO[] = [];
  getAlLDataTitle() {
    this.appService.getAlLDataTitle().subscribe(res => {
      this.dataHomeTitle = res.data;
    });
    this.appService.getAlLDataImage().subscribe(res => {
      this.dataHomeImage = res.data;
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
      this.changeTabNameForeignTour(res.data[0].id);
    });
  }
  // hàm thay đổi tab và cũng là để gửi về serve khi mình quốc gia nào
  handleChangeForeignTour(tabName: string) {
    const selectedTab = this.tabsForeignTour.find(tab => tab.name === tabName);
    if (selectedTab) {
      this.selectedTabForeignTour = selectedTab;
      this.changeTabNameForeignTour(selectedTab.id);
    }
  }
  // thay đổi tab thì lấy dữ liệu của tab đó
  changeTabNameForeignTour(id: number) {
    this.appService.changeTabForeign(id).subscribe(res => {
      this.dataTourForeign = res.data.content ?? [];
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
        this.changeTabNameDomesticTour(res.data[0].id);
      }
    });
  }

  handleChangeDomesticTour(tabName: string) {
    this.selectedTabDomesticTour = this.tabsDomesticTour.find(
      tab => tab.name === tabName
    )!;

    this.changeTabNameDomesticTour(this.selectedTabDomesticTour.id);
  }

  changeTabNameDomesticTour(id: number) {
    this.appService.changeTabDomestic(id).subscribe(res => {
      this.dataTourDomestic = res.data.content ?? [];
      console.log(this.dataTourDomestic);
    });
  }

  /*========================== CẨM NANG DU LỊCH =============================*/
  featureNews!: TravelGuideResDTO;
  featureLeftNews: TravelGuideResDTO[] = [];
  featureRightNews: TravelGuideResDTO[] = [];

  getAllDataNews() {
    this.appService.getAllDataTravelGuide().subscribe(data => {
      if (data.length > 0) {
        this.featureNews = data[0];
        this.featureLeftNews = data.slice(1, 4);
        this.featureRightNews = data.slice(4, 10);
      }
    });
  }

  /*========================== COMMENT FEEDBACK =============================*/
  dataCustomerFeedback: CommentFeedbackResDTO[] = [];

  getAllDataCommentFeedBack() {
    this.appService.getAllDataCommentFeedback().subscribe(res => {
      console.log(res);
      this.dataCustomerFeedback = res.data;
    });
  }
}
