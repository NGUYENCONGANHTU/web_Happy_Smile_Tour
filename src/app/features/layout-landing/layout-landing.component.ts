import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppService } from '../../../app.service';
import { VisaServiceResDTO } from '../../../interface';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';

interface ILang {
  code: string;
  name: string;
  flag: string;
}

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
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './layout-landing.component.html',
  styleUrl: './layout-landing.component.scss',
  standalone: true,
})
export class LayoutLandingComponent implements OnInit {
  translate = inject(TranslateService);
  languageService = inject(LanguageService);

  faCaretDown = faCaretDown;
  languages: ILang[] = [
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'en', name: 'English', flag: 'gb' },
  ];
  selectedLang!: ILang;

  isServiceActive = false;
  isMenuOpen = false;

  selectedServiceId: number | null = null;
  selectService(id: number) {
    this.selectedServiceId = id;
  }

  router = inject(Router);
  ngOnInit() {
    this.selectedLang = this.languages.find(
      lang => lang.code === (localStorage.getItem('lang') ?? 'vi')
    ) as ILang;
    this.translate.use(this.languageService.locale);
    this.getDataVisaMenu();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isServiceActive = event.url.startsWith('/tab-service');
      });
  }
  appService = inject(AppService);
  dataVisaMenu: VisaServiceResDTO[] = [];
  getDataVisaMenu() {
    this.appService.getAllDataMenuService().subscribe(res => {
      this.dataVisaMenu = res.data;
    });
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleChangeLanguage(lang: ILang) {
    this.selectedLang = lang;
    this.languageService.setLanguage(lang.code);
    location.reload();
  }
}
