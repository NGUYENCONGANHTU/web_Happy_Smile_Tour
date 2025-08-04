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
import { TranslatePipe } from '@ngx-translate/core';
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
  appService = inject(AppService);

  rangeValue: number[] = [0, 200000000]; // Khoảng ngân sách
  departure = ''; // Điểm đến
  destination = ''; // Điểm đi

  @Output() filtersChanged = new EventEmitter<any>();
  searchTour(): void {
    const formData = {
      min: this.rangeValue[0],
      max: this.rangeValue[this.rangeValue.length - 1],
      departure: this.departure,
      destination: this.destination,
    };
    this.filtersChanged.emit(formData);
  }

  ngOnInit() {
    this.getDataStartingPointDomestic();
    this.getDataStartingPointForeign();
  }
  dataStartingPointDomestic: LocationResDTO[] = [];
  getDataStartingPointDomestic() {
    this.appService.getAlLDataLocationDomestic().subscribe(res => {
      this.dataStartingPointDomestic = res.data;
    });
  }
  dataStartingPointForeign: LocationResDTO[] = [];
  getDataStartingPointForeign() {
    this.appService.getAlLDataLocationInternational().subscribe(res => {
      this.dataStartingPointForeign = res.data;
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
