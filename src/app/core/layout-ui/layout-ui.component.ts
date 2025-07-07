import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-layout-ui',
  imports: [
    NzButtonModule,
    NzLayoutModule,
    RouterOutlet,
    FaIconComponent,
    NzDropDownModule,
    NzIconModule,
  ],
  templateUrl: './layout-ui.component.html',
  styleUrl: './layout-ui.component.scss',
})
export class LayoutUiComponent {
  faBars = faBars;
  faXmark = faXmark;
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isServiceOpen = false;
  toggleServiceDropdown() {
    this.isServiceOpen = !this.isServiceOpen;
  }
  isLanguageOpen = false;

  toggleLanguageDropdown() {
    this.isLanguageOpen = !this.isLanguageOpen;
  }
}
