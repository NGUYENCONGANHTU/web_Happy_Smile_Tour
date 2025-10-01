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
import { TranslatePipe } from '../../translatepipe';

@Component({
  selector: 'app-tour-feature-foreign',
  imports: [FaIconComponent, DecimalPipe, NgClass, RouterLink, TranslatePipe],
  standalone: true,
  templateUrl: './tour-feature-foreign.component.html',
  styleUrl: './tour-feature-foreign.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourFeatureForeignComponent implements OnInit {
  @Input() selectedTabForeignTour!: LocationResDTO;
  @Input() dataTour: FeatureResDTO[] = [];
  // service
  translate = inject(TranslateService);
  languageService = inject(LanguageService);
  // icon
  faStar = faStar;
  // change href data
  formatImage = sanitizeUrl;

  ngOnInit() {
    this.translate.use(this.languageService.locale);
  }
}
