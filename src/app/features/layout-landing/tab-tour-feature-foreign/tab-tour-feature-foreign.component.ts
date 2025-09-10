import { Component, inject, OnInit } from '@angular/core';
import { SidebarFeatureForeignComponent } from './sidebar-feature-foreign/sidebar-feature-foreign.component';
import { ContentFeatureForeignComponent } from './content-feature-foreign/content-feature-foreign.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { FeatureResDTO } from '../../../../interface';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../translation.service';

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
export class TabTourFeatureForeignComponent implements OnInit {
  filters: FeatureResDTO[] = [];
  onFiltersChanged(newFilters: FeatureResDTO[]) {
    this.filters = newFilters;
  }
  ngOnInit() {
    this.getDataTransitionTour();
  }
  // service Language
  transitionService = inject(TranslationService);
  dataTrans: TranslationResponse['data'] | null = null;

  getDataTransitionTour() {
    this.transitionService.getDataTransLate().subscribe(res => {
      this.dataTrans = res.data;
    });
  }
  getTrans(key: TranslationSection, value: string, fallback = ''): string {
    return this.dataTrans?.[key]?.[value] ?? fallback;
  }
}
