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
import { TranslatePipe } from '@ngx-translate/core';
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
  appService = inject(AppService);
  @Output() filtersChanged = new EventEmitter<any>();

  rangeValue: number[] = [0, 200000000];
  departure = '';
  destination = '';

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
    // Đặt lại giá trị mặc định
    this.rangeValue = [0, 200000000];
    this.departure = '';
    this.destination = '';

    // Phát sự kiện gửi dữ liệu về mặc định
    const defaultData = {
      min: this.rangeValue[0],
      max: this.rangeValue[this.rangeValue.length - 1],
      departure: this.departure,
      destination: this.destination,
    };
    this.filtersChanged.emit(defaultData);
  }

  ngOnInit() {
    this.getDataStartingPoint();
  }
  dataStartingPointDomestic: LocationResDTO[] = [];
  getDataStartingPoint() {
    this.appService.getAlLDataLocationDomestic().subscribe(res => {
      this.dataStartingPointDomestic = res.data;
    });
  }

  tabs = [
    {
      tabName: 'domestic_tour.tab_domestic',
      href: '/tour-feature-domestic',
    },
    {
      tabName: 'domestic_tour.tab_foreign',
      href: '/tour-feature-foreign',
    },
  ];
}
