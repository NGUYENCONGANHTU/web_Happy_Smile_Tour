import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {FeaturePlaceComponent} from './feature-place/feature-place.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {PriceListComponent} from './price-list/price-list.component';
import {ServiceComponent} from './service/service.component';
import {SidebarTabTourForeignComponent} from './sidebar-tab-tour-foreign/sidebar-tab-tour-foreign.component';
import {SlideTourDetailComponent} from './slide-tour-detail/slide-tour-detail.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {RouterLink} from '@angular/router';
// import {SlideTourDetailComponent} from './slide-tour-detail/slide-tour-detail.component';

@Component({
  selector: 'app-tab-tour-foreign-detail',
  standalone: true,
  imports: [
    FeaturePlaceComponent,
    ScheduleComponent,
    PriceListComponent,
    ServiceComponent,
    SidebarTabTourForeignComponent,
    SlideTourDetailComponent,
    NzBreadCrumbModule,
    RouterLink
  ],
  templateUrl: './tab-tour-foreign-detail.component.html',
  styleUrl: './tab-tour-foreign-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabTourForeignDetailComponent {

  @ViewChild('diemNoiBat') diemNoiBatSection!: ElementRef;
  @ViewChild('lichTrinh') lichTrinhSection!: ElementRef;
  @ViewChild('bangGia') bangGiaSection!: ElementRef;
  @ViewChild('dichVu') dichVuSection!: ElementRef;

  scrollTo(section: string) {
    switch(section) {
      case 'diemNoiBat':
        this.diemNoiBatSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'lichTrinh':
        this.lichTrinhSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'bangGia':
        this.bangGiaSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'dichVu':
        this.dichVuSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
}
