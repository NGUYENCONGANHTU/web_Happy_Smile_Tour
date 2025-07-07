import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-layout-landing',
  imports: [
    RouterOutlet,
    RouterLink,
    NzDropDownModule,
    NzMenuDirective,
    NzMenuItemComponent,
    FaIconComponent,
    RouterLinkActive,
  ],
  templateUrl: './layout-landing.component.html',
  styleUrl: './layout-landing.component.scss',
})
export class LayoutLandingComponent {
  faCaretDown = faCaretDown;
  languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'cn', name: '中文', flag: 'cn' },
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'en', name: 'English (Philippines)', flag: 'gb' },
    { code: 'cn', name: '中文', flag: 'cn' },
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'en', name: 'English (Hong Kong, SAR)', flag: 'gb' },
    { code: 'cn', name: '中文', flag: 'cn' },
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'cn', name: '中文', flag: 'cn' },
  ];
}
