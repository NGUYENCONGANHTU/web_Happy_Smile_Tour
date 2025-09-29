import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { DecimalPipe } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppService } from '../../../../../app.service';
import { LocationResDTO } from '../../../../../interface';
import {
  TranslationResponse,
  TranslationService,
} from '../../translation.service';
import { TranslatePipe } from '../../translatepipe';
import { LanguageService } from '../../../../shared/services/language.service';

@Component({
  selector: 'app-sidebar-feature-foreign',
  standalone: true,
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
  templateUrl: './sidebar-feature-foreign.component.html',
  styleUrl: './sidebar-feature-foreign.component.scss',
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `,
  ],
})
export class SidebarFeatureForeignComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();
  // service
  appService = inject(AppService);
  languageService = inject(LanguageService); // language Service

  // giá trị lọc
  departure = '';
  destination = '';
  max = 200000000;
  step = 1000000;
  unit = 'VNĐ';
  rangeValue: number[] = [0, this.max];

  translate: any;

  ngOnInit() {
    this.getDataStartingPointDomestic();
    this.getDataStartingPointForeign();
    this.getDataTransitionTour();
    this.setTabs();
  }
  // Hàm lọc tour
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
  getDataStartingPointDomestic() {
    this.appService.getAlLDataLocationDomestic().subscribe(res => {
      this.dataStartingPointDomestic = res.data;
    });
  }

  // Hàm lấy điểm đi
  dataStartingPointForeign: LocationResDTO[] = [];
  getDataStartingPointForeign() {
    this.appService.getAlLDataLocationInternational().subscribe(res => {
      this.dataStartingPointForeign = res.data;
    });
  }

  // service Language
  transitionService = inject(TranslationService);
  dataTrans: TranslationResponse['data'] | null = null;
  getDataTransitionTour() {
    this.transitionService.getDataTransLate().subscribe(res => {
      this.dataTrans = res.data;
      const foreign: Record<string, string> | undefined =
        this.dataTrans?.tab_foreign;
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
