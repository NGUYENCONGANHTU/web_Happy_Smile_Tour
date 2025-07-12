import { Component } from '@angular/core';
import { FeaturePlaceComponent } from '../tab-tour-foreign-detail/feature-place/feature-place.component';
import { FormFeedbackComponent } from '../tab-tour-foreign-detail/form-feedback/form-feedback.component';
import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
} from 'ng-zorro-antd/breadcrumb';
import { PriceListComponent } from '../tab-tour-foreign-detail/price-list/price-list.component';
import { RouterLink } from '@angular/router';
import { ScheduleComponent } from '../tab-tour-foreign-detail/schedule/schedule.component';
import { SidebarTabTourForeignComponent } from '../tab-tour-foreign-detail/sidebar-tab-tour-foreign/sidebar-tab-tour-foreign.component';
import { SlideTourDetailComponent } from '../tab-tour-foreign-detail/slide-tour-detail/slide-tour-detail.component';

@Component({
  selector: 'app-tab-tour-domestic-detail',
  imports: [
    FeaturePlaceComponent,
    FormFeedbackComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    PriceListComponent,
    RouterLink,
    ScheduleComponent,
    SidebarTabTourForeignComponent,
    SlideTourDetailComponent,
  ],
  templateUrl: './tab-tour-domestic-detail.component.html',
  styleUrl: './tab-tour-domestic-detail.component.scss',
})
export class TabTourDomesticDetailComponent {}
