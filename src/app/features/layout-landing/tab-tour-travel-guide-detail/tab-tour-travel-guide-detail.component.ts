import { Component } from '@angular/core';
import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
} from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-tour-travel-guide-detail',
  imports: [NzBreadCrumbComponent, NzBreadCrumbItemComponent, RouterLink],
  templateUrl: './tab-tour-travel-guide-detail.component.html',
  styleUrl: './tab-tour-travel-guide-detail.component.scss',
})
export class TabTourTravelGuideDetailComponent {}
