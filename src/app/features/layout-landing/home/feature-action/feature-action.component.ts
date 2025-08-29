import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { AppService } from '../../../../../app.service';
import { FeatureResDTO } from '../../../../../interface';
import { RouterLink } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DecimalPipe, NgClass } from '@angular/common';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language.service';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../../translation.service';
@Component({
  selector: 'app-feature-action',
  standalone: true,
  imports: [RouterLink, FaIconComponent, NgClass, DecimalPipe],
  templateUrl: './feature-action.component.html',
  styleUrl: './feature-action.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureActionComponent implements OnInit {
  translate = inject(TranslateService);
  languageService = inject(LanguageService);

  appService = inject(AppService);

  ngOnInit() {
    this.translate.use(this.languageService.locale);
    this.getAllData();
    this.getDataTransitionTour();
  }

  formatImage = sanitizeUrl;
  faStar = faStar;

  dataFeatureTour: FeatureResDTO[] = [];
  getAllData() {
    this.appService.getAllDataTourFeature4().subscribe(res => {
      if (res.data) {
        this.dataFeatureTour = res.data;
      } else {
        this.dataFeatureTour = [];
      }
    });
  }

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
