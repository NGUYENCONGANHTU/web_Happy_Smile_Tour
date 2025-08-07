import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { ORIGINAL_LANGUAGE } from '../../constants/global.constant';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  standalone: true,
  imports: [NzSelectModule, FormsModule],
})
export class LanguageSelectionComponent {
  @Input({ required: true }) selectedLanguage?: string;
  @Input() includeOriginLanguage = true;

  @Output() selectedLanguageChange = new EventEmitter<string>();

  sharedService = inject(SharedDataService);

  get listLanguages() {
    return this.includeOriginLanguage
      ? this.sharedService.getLanguageOptions()
      : this.sharedService
          .getLanguageOptions()
          .filter(l => l.code !== ORIGINAL_LANGUAGE);
  }
}
