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
import { sanitizeUrl } from '../../../../shared/utils/helpers';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language.service';
@Component({
  selector: 'app-feature-action',
  standalone: true,
  imports: [RouterLink, FaIconComponent, NgClass, DecimalPipe, TranslatePipe],
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
}
