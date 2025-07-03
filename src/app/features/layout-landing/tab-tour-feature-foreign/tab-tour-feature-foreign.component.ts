import { Component } from '@angular/core';
import {
  ContentFeatureDomesticComponent
} from '../tab-tour-feature-domestic/content-feature-domestic/content-feature-domestic.component';
import {
  SidebarFeatureDomesticComponent
} from '../tab-tour-feature-domestic/sidebar-feature-domestic/sidebar-feature-domestic.component';
import {SidebarFeatureForeignComponent} from './sidebar-feature-foreign/sidebar-feature-foreign.component';
import {ContentFeatureForeignComponent} from './content-feature-foreign/content-feature-foreign.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tab-tour-feature-foreign',
  imports: [
    SidebarFeatureForeignComponent,
    ContentFeatureForeignComponent,
    SidebarFeatureForeignComponent,
    NzBreadCrumbModule,
    RouterLink

  ],
  templateUrl: './tab-tour-feature-foreign.component.html',
  styleUrl: './tab-tour-feature-foreign.component.scss'
})
export class TabTourFeatureForeignComponent {

}
