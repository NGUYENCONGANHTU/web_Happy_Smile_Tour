import { Component, inject, OnInit } from '@angular/core';
import { ContentFeatureDomesticComponent } from './content-feature-domestic/content-feature-domestic.component';
import { SidebarFeatureDomesticComponent } from './sidebar-feature-domestic/sidebar-feature-domestic.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { FeatureResDTO } from '../../../../interface';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../translation.service';
import { TranslatePipe } from '../translatepipe';

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
export class TabTourFeatureDomesticComponent implements OnInit {
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
