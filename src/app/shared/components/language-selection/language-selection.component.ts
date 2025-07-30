import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  standalone: true,
  imports: [NzSelectModule, FormsModule],
})
export class LanguageSelectionComponent {
  @Input({ required: true }) selectedLanguage!: string;
  @Output() selectedLanguageChange = new EventEmitter<string>();
  sharedService = inject(SharedDataService);

  get listLanguages() {
    return this.sharedService.getLanguageOptions();
  }
}
