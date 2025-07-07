import { Component, computed } from '@angular/core';
import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
} from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb-component',
  templateUrl: 'breadcrumb.component.html',
  imports: [NzBreadCrumbComponent, NzBreadCrumbItemComponent, RouterLink],
  standalone: true,
})
export class BreadcrumbComponent {
  breadcrumbs = computed(() => this.breadcrumbService.breadcrumbs());

  constructor(private breadcrumbService: BreadcrumbService) {}
}
