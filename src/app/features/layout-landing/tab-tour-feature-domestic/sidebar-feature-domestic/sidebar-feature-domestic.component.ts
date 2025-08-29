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
  TranslationSection,
  TranslationService,
} from '../../translation.service';

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
  appService = inject(AppService);
  transitionService = inject(TranslationService);

  @Output() filtersChanged = new EventEmitter<any>();

  rangeValue: number[] = [0, 200000000];
  departure = '';
  destination = '';
  dataStartingPointDomestic: LocationResDTO[] = [];

  // dữ liệu translation
  dataTrans: TranslationResponse['data'] | null = null;

  // Tabs hiển thị
  tabs: { tabName: string; href: string }[] = [];

  ngOnInit() {
    this.getDataStartingPoint();
    this.getDataTransitionTour();
  }

  searchTour(): void {
    const formData = {
      min: this.rangeValue[0],
      max: this.rangeValue[this.rangeValue.length - 1],
      departure: this.departure,
      destination: this.destination,
    };
    this.filtersChanged.emit(formData);
  }

  resetFilters(): void {
    this.rangeValue = [0, 200000000];
    this.departure = '';
    this.destination = '';

    const defaultData = {
      min: this.rangeValue[0],
      max: this.rangeValue[this.rangeValue.length - 1],
      departure: this.departure,
      destination: this.destination,
    };
    this.filtersChanged.emit(defaultData);
  }

  getDataStartingPoint() {
    this.appService.getAlLDataLocationDomestic().subscribe(res => {
      this.dataStartingPointDomestic = res.data;
    });
  }

  getDataTransitionTour() {
    this.transitionService.getDataTransLate().subscribe(res => {
      this.dataTrans = res.data;

      // chỉ khi có data mới tạo tabs
      this.tabs = [
        {
          tabName: this.getTrans('tab_domestic', 'domestic'),
          href: '/tour-feature-domestic',
        },
        {
          tabName: this.getTrans('tab_domestic', 'international'),
          href: '/tour-feature-foreign',
        },
      ];
    });
  }

  getTrans(key: TranslationSection, value: string, fallback = ''): string {
    return this.dataTrans?.[key]?.[value] ?? fallback;
  }
}
