import { Component } from '@angular/core';
import { SidebarFeatureForeignComponent } from './sidebar-feature-foreign/sidebar-feature-foreign.component';
import { ContentFeatureForeignComponent } from './content-feature-foreign/content-feature-foreign.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-tour-feature-foreign',
  standalone: true,
  imports: [
    SidebarFeatureForeignComponent,
    ContentFeatureForeignComponent,
    SidebarFeatureForeignComponent,
    NzBreadCrumbModule,
    RouterLink,
  ],
  templateUrl: './tab-tour-feature-foreign.component.html',
  styleUrl: './tab-tour-feature-foreign.component.scss',
})
export class TabTourFeatureForeignComponent {}
