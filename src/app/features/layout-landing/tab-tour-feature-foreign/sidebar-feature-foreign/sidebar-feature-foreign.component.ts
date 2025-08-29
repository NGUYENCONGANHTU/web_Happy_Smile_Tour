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
  TranslationSection,
  TranslationService,
} from '../../translation.service';

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
  appService = inject(AppService);
  @Output() filtersChanged = new EventEmitter<any>();

  rangeValue: number[] = [0, 200000000];
  departure = '';
  destination = '';

  translate: any;
  tabs: any[] = [];

  dataStartingPointDomestic: LocationResDTO[] = [];
  dataStartingPointForeign: LocationResDTO[] = [];

  ngOnInit() {
    this.getDataStartingPointDomestic();
    this.getDataStartingPointForeign();
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

    this.filtersChanged.emit({
      min: this.rangeValue[0],
      max: this.rangeValue[this.rangeValue.length - 1],
      departure: this.departure,
      destination: this.destination,
    });
  }

  getDataStartingPointDomestic() {
    this.appService.getAlLDataLocationDomestic().subscribe(res => {
      this.dataStartingPointDomestic = res.data;
    });
  }

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
