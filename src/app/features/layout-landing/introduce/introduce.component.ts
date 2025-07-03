import {Component, inject, OnInit} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {AppService} from '../../../../app.service';
import {IntroducePageResDTO, IntroduceTitleResDTO} from '../../../../interface';
import {NgStyle} from '@angular/common';
@Component({
  selector: 'app-introduce',
  imports: [NzButtonModule, NzCollapseModule, NzIconModule, NzCarouselModule, NgStyle],
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
    `
  ]
})
export class IntroduceComponent implements OnInit {

  array = [1, 2, 3, 4];

  appService = inject(AppService)

  ngOnInit() {
  this.getDataBannerIntroducePage();
  this.getAllDataHighLightIntroducePage();
  this.getAllDataBenefitIntroducePage();
  this.getAllDataTitleIntroducePage();
  this.getAllDataStatisticalIntroducePage();
  }


  // function Banner Introduce
  dataBannerIntroduce:IntroducePageResDTO[]=[];
  getDataBannerIntroducePage(){
    this.appService.getAllDataBannerIntroducePage().subscribe(data => {
      this.dataBannerIntroduce = data;
    })
  }
  // function Banner Introduce
  dataServiceIntroduce:IntroducePageResDTO[]=[];
  getAllDataHighLightIntroducePage(){
    this.appService.getAllDataHighLightIntroducePage().subscribe(data => {
      this.dataServiceIntroduce = data;
    })
  }
  // function Banner Introduce BENEFIT
  dataContentIntroducePage:IntroducePageResDTO[]=[];
  getAllDataBenefitIntroducePage(){
    this.appService.getAllDataMainIntroducePage().subscribe(data => {
      this.dataContentIntroducePage = data;
    })
  }


  // Số liệu thống kê
  dataTitleIntroducePage:IntroduceTitleResDTO[]=[];
  getAllDataTitleIntroducePage(){
    this.appService.getAllDataTitleIntroducePage().subscribe(data => {
      this.dataTitleIntroducePage = data;
    })
  }
  dataStatisticalIntroducePage:IntroduceTitleResDTO[]=[];
  getAllDataStatisticalIntroducePage(){
    this.appService.getAllDataStatisticalIntroducePage().subscribe(data => {
      this.dataStatisticalIntroducePage = data;
    })
  }
}




