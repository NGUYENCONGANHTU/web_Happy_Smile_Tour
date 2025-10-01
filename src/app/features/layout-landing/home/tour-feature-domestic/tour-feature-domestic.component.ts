import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe, NgClass } from '@angular/common';
import { FeatureResDTO, LocationResDTO } from '../../../../../interface';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language.service';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';
import { TranslatePipe } from '../../translatepipe';
@Component({
  selector: 'app-tour-feature-domestic',
  imports: [FaIconComponent, NgClass, DecimalPipe, RouterLink, TranslatePipe],
  templateUrl: './tour-feature-domestic.component.html',
  styleUrl: './tour-feature-domestic.component.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourFeatureDomesticComponent implements OnInit {
  @Input() selectedTabDomesticTour!: LocationResDTO;
  @Input() dataDomesticTour: FeatureResDTO[] = [];
  // service
  translate = inject(TranslateService);
  languageService = inject(LanguageService);
  // icon
  faStar = faStar;
  // change href image
  formatImage = sanitizeUrl;

  ngOnInit() {
    this.translate.use(this.languageService.locale);
  }
}
