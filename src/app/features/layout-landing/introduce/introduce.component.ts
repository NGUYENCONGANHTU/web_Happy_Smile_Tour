import { Component, inject, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppService } from '../../../../app.service';
import {
  HomeBannerResDTO,
  IntroducePageResDTO,
  IntroduceTitleResDTO,
} from '../../../../interface';
import { NgStyle } from '@angular/common';
import { AdvertiseResDTO } from './interface-introduce';
import { sanitizeUrl } from '../../../shared/utils/helpers';
@Component({
  selector: 'app-introduce',
  imports: [
    NzButtonModule,
    NzCollapseModule,
    NzIconModule,
    NzCarouselModule,
    NgStyle,
  ],
  templateUrl: './introduce.component.html',
  styleUrl: './introduce.component.scss',
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        height: 100px;
        margin-bottom: 0;
        overflow: hidden;
      }
      h3 {
        color: #000000;
        margin-bottom: 0;
        user-select: none !important;
        -webkit-user-drag: none;
      }
    `,
  ],
})
export class IntroduceComponent implements OnInit {
  array = [1, 2, 3, 4];

  appService = inject(AppService);

  ngOnInit() {
    this.getDataBannerIntroducePage();
    this.getAllDataHighLightIntroducePage();
    this.getAllDataBenefitIntroducePage();
    this.getAllDataTitleIntroducePage();
    this.getAllDataStatisticalIntroducePage();
  }
  formatImage = sanitizeUrl;

  // function Banner Introduce
  dataBannerIntroduce: HomeBannerResDTO[] = [];
  getDataBannerIntroducePage() {
    this.appService.getAlLDataBannerIntro().subscribe(res => {
      if (res?.data) {
        this.dataBannerIntroduce = res.data;
      } else {
        this.dataBannerIntroduce = [];
      }
    });
  }
  // function Banner Introduce
  dataServiceIntroduce: AdvertiseResDTO[] = [];
  getAllDataHighLightIntroducePage() {
    this.appService.getAllDataAdvertise().subscribe(res => {
      if (res?.data) {
        this.dataServiceIntroduce = res.data;
      } else {
        this.dataServiceIntroduce = [];
      }
    });
  }
  // function Banner Introduce BENEFIT
  dataContentIntroducePage: IntroducePageResDTO[] = [];
  getAllDataBenefitIntroducePage() {
    this.appService.getAllDataMainIntroducePage().subscribe(res => {
      if (res?.data) {
        this.dataContentIntroducePage = res.data;
      } else {
        this.dataContentIntroducePage = [];
      }
    });
  }

  // Số liệu thống kê
  dataTitleIntroducePage: IntroduceTitleResDTO[] = [];
  getAllDataTitleIntroducePage() {
    this.appService.getAllDataTitleIntroducePage().subscribe(res => {
      if (res?.data) {
        this.dataTitleIntroducePage = res.data;
      } else {
        this.dataTitleIntroducePage = [];
      }
    });
  }
  dataStatisticalIntroducePage: IntroduceTitleResDTO[] = [];
  getAllDataStatisticalIntroducePage() {
    this.appService.getAllDataStatisticalIntroducePage().subscribe(res => {
      if (res?.data) {
        this.dataStatisticalIntroducePage = res.data;
      } else {
        this.dataStatisticalIntroducePage = [];
      }
    });
  }
}
