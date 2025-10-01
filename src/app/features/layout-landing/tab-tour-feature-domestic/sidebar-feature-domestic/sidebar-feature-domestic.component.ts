import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { DecimalPipe } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LocationResDTO } from '../../../../../interface';
import { AppService } from '../../../../../app.service';
import {
  TranslationResponse,
  TranslationService,
} from '../../translation.service';
import { TranslatePipe } from '../../translatepipe';

@Component({
  selector: 'app-sidebar-feature-domestic',
  imports: [
    NzButtonModule,
    NzCheckboxModule,
    NzCollapseModule,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
    NzSliderModule,
    RouterLinkActive,
    RouterLink,
    DecimalPipe,
    TranslatePipe,
  ],
  templateUrl: './sidebar-feature-domestic.component.html',
  styleUrl: './sidebar-feature-domestic.component.scss',
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `,
  ],
})
export class SidebarFeatureDomesticComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();
  // service
  appService = inject(AppService);

  departure = '';
  destination = '';
  max = 200000000;
  step = 1000000;
  unit = 'VNĐ';
  rangeValue: number[] = [0, this.max];

  ngOnInit() {
    this.getDataStartingPoint();
    this.getDataTransitionTour();
    this.setTabs();
  }

  // Hàm reset filter
  searchTour(): void {
    const formData = {
      min: this.rangeValue[0],
      max: this.rangeValue[this.rangeValue.length - 1],
      departure: this.departure,
      destination: this.destination,
    };
    this.filtersChanged.emit(formData);
  }

  // Hàm reset filter
  resetFilters(): void {
    this.rangeValue = [0, this.max];
    this.departure = '';
    this.destination = '';

    this.filtersChanged.emit({
      min: this.rangeValue[0],
      max: this.rangeValue[this.rangeValue.length - 1],
      departure: this.departure,
      destination: this.destination,
    });
  }

  // Hàm lấy điểm đến
  dataStartingPointDomestic: LocationResDTO[] = [];
  getDataStartingPoint() {
    this.appService.getAlLDataLocationDomestic().subscribe(res => {
      this.dataStartingPointDomestic = res.data;
    });
  }

  // Hàm lấy bản dịch
  // dữ liệu translation
  dataTrans: TranslationResponse['data'] | null = null;
  transitionService = inject(TranslationService);
  getDataTransitionTour() {
    this.transitionService.getDataTransLate().subscribe(res => {
      this.dataTrans = res.data;
      // Lấy dữ liệụ bản dịch của thanh slider
      const foreign: Record<string, string> | undefined =
        this.dataTrans?.tab_domestic;
      if (foreign) {
        this.max = Number(foreign['max']);
        this.step = Number(foreign['step']);
        this.unit = foreign['unit'];

        // reset lại Slider value theo max mới
        this.rangeValue = [0, this.max];
        console.log('Max:', this.max, 'Step:', this.step, 'Unit:', this.unit); // Kiểm tra giá trị
      }
    });
  }

  // Tabs hiển thị side-bar
  tabs: { tabName: string; href: string }[] = [];
  setTabs() {
    this.tabs = [
      { tabName: 'domestic', href: '/tour-feature-domestic' },
      { tabName: 'international', href: '/tour-feature-foreign' },
    ];
  }
}
