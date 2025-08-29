import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO, LocationResDTO } from '../../../../../interface';
import { DecimalPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language.service';
import {
  TranslationResponse,
  TranslationSection,
  TranslationService,
} from '../../translation.service';

@Component({
  selector: 'app-tour-feature-foreign',
  imports: [FaIconComponent, DecimalPipe, NgClass, RouterLink],
  standalone: true,
  templateUrl: './tour-feature-foreign.component.html',
  styleUrl: './tour-feature-foreign.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourFeatureForeignComponent implements OnInit {
  faStar = faStar;
  formatImage = sanitizeUrl;
  translate = inject(TranslateService);
  languageService = inject(LanguageService);
  @Input() selectedTabForeignTour!: LocationResDTO;
  @Input() dataTour: FeatureResDTO[] = [];

  ngOnInit() {
    this.translate.use(this.languageService.locale);
    this.getDataTransitionTour();
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
