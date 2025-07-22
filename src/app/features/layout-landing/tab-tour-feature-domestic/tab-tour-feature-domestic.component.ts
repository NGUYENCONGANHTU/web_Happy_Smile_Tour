import { Component } from '@angular/core';
import { ContentFeatureDomesticComponent } from './content-feature-domestic/content-feature-domestic.component';
import { SidebarFeatureDomesticComponent } from './sidebar-feature-domestic/sidebar-feature-domestic.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { FeatureResDTO } from '../../../../interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-tour-feature-domestic',
  imports: [
    ContentFeatureDomesticComponent,
    SidebarFeatureDomesticComponent,
    NzBreadCrumbModule,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './tab-tour-feature-domestic.component.html',
  styleUrl: './tab-tour-feature-domestic.component.scss',
})
export class TabTourFeatureDomesticComponent {
  filters: FeatureResDTO[] = [];

  onFiltersChanged(newFilters: FeatureResDTO[]) {
    this.filters = newFilters;
    console.log(this.filters);
  }
}
