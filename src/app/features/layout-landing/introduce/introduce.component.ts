import { Component, inject, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppService } from '../../../../app.service';
import { HomeBannerResDTO } from '../../../../interface';
import { NgStyle } from '@angular/common';
import {
  AdvertiseResDTO,
  IntroducePageResDTO,
  IntroduceTitlePageResDTO,
} from './interface-introduce';
import { sanitizeUrl } from '../../../shared/utils/helpers';
import { IntroduceService } from './introduce.service';
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
  formatImage = sanitizeUrl;

  appService = inject(AppService);

  ngOnInit() {
    this.getDataBannerIntroducePage();
    this.getAllDataHighLightIntroducePage();
    this.getDataTitleIntro();
    this.getDataIntroPage();
    this.getDataStatistical();
  }
  // banner Gioi thieu
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
  // lấy tiêu đề của trang giới thiệu
  introService = inject(IntroduceService);
  dataTitleIntro: IntroduceTitlePageResDTO[] = [];
  getDataTitleIntro() {
    this.introService.getAllDataIntroduceTitle().subscribe(dataIntro => {
      this.dataTitleIntro = dataIntro.data;
    });
  }

  // văn bản giới thiệu
  dataIntroPage: IntroducePageResDTO[] = [];
  getDataIntroPage() {
    this.introService.getAllDataIntroduceMain().subscribe(dataIntroPage => {
      this.dataIntroPage = dataIntroPage.data;
    });
  }
  // số liệu thống kê
  dataStatistical: IntroducePageResDTO[] = [];
  getDataStatistical() {
    this.introService
      .getAllDataIntroduceStatistical()
      .subscribe(dataStatistical => {
        this.dataStatistical = dataStatistical.data;
      });
  }

  // function Banner Introduce
  dataServiceIntroduce: AdvertiseResDTO[] = [];
  getAllDataHighLightIntroducePage() {
    this.introService.getAllDataAdvertise().subscribe(res => {
      if (res?.data) {
        this.dataServiceIntroduce = res.data;
      } else {
        this.dataServiceIntroduce = [];
      }
    });
  }
}
