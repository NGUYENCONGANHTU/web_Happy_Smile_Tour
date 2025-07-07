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
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
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
    FaIconComponent,
    FeatureActionComponent,
    TabsForeignTourComponent,
    NgForOf,
    TabsDomesticTourComponent,
    TourFeatureForeignComponent,
    TourFeatureDomesticComponent,
    TravelHandbookComponent,
    CustomerFeedbackComponent,
    FeatureCustomerComponent,
    NgIf,
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
  faMagnifyingGlass = faMagnifyingGlass;
  searchValue = '';
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
    this.appService.getAlLData().subscribe(data => {
      this.dataBannerHome = data;
    });
  }

  /*========================== Home Title =============================*/
  dataHomeTitle: HomeTitleResDTO[] = [];
  dataHomeImage: HomeTitleResDTO[] = [];
  getAlLDataTitle() {
    this.appService.getAlLDataTitle().subscribe(data => {
      this.dataHomeTitle = data;
    });
    this.appService.getAlLDataImage().subscribe(data => {
      this.dataHomeImage = data;
    });
  }

  /*========================== LOCATION  FOREIGN TOUR =============================*/
  dataTourForeign: FeatureResDTO[] = [];
  tabsForeignTour: LocationResDTO[] = [];
  selectedTabForeignTour!: LocationResDTO;

  // hàm lấy tất cả các quốc gia ở ngoài nước
  getAlLDataLocationInternational() {
    this.appService.getAlLDataLocationInternational().subscribe(data => {
      if (data.length) {
        this.tabsForeignTour = data;
        this.selectedTabForeignTour = data[0];
        this.changeTabNameForeignTour(data[0].name);
      }
    });
  }
  // hàm thay đổi tab và cũng là để gửi về serve khi mình quốc gia nào
  handleChangeForeignTour(tabName: string) {
    this.selectedTabForeignTour = this.tabsForeignTour.find(
      tab => tab.name === tabName
    )!;
    this.changeTabNameForeignTour(tabName);
  }
  // thay đổi tab thì lấy dữ liệu của tab đó
  changeTabNameForeignTour(tabName: string) {
    this.appService.changeTabForeign(tabName).subscribe(data => {
      this.dataTourForeign = data;
      console.log('Dữ liệu tour:', data);
    });
  }

  /*========================== LOCATION DOMESTIC =============================*/
  dataTourDomestic: FeatureResDTO[] = [];
  tabsDomesticTour: LocationResDTO[] = [];
  selectedTabDomesticTour!: LocationResDTO;

  getAllDataLocationDomestic() {
    this.appService.getAlLDataLocationDomestic().subscribe(data => {
      if (data.length) {
        this.tabsDomesticTour = data;
        this.selectedTabDomesticTour = data[0];
      }
    });
  }

  handleChangeDomesticTour(tabName: string) {
    this.selectedTabDomesticTour = this.tabsDomesticTour.find(
      tab => tab.name === tabName
    )!;
    this.changeTabNameDomesticTour(tabName);
  }

  changeTabNameDomesticTour(tabName: string) {
    this.appService.changeTabDomestic(tabName).subscribe(data => {
      this.dataTourDomestic = data;
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
    this.appService.getAllDataCommentFeedback().subscribe(data => {
      this.dataCustomerFeedback = data;
    });
  }
}
