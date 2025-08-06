import { Component } from '@angular/core';
import { BannerFormComponent } from './components/banner-form/banner-form.component';
import { LanguageSelectionComponent } from '../../../../../shared/components/language-selection/language-selection.component';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';

@Component({
  selector: 'app-banner-config',
  templateUrl: './banner-config.component.html',
  imports: [BannerFormComponent, LanguageSelectionComponent],
  standalone: true,
})
export class BannerConfigComponent {
  selectedLanguage = ORIGINAL_LANGUAGE;
}
