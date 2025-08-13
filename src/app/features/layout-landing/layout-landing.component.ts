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
import {
  FooterResDTO,
  LanguageResDTO,
  VisaServiceResDTO,
} from '../../../interface';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';
// import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { sanitizeUrl } from '../../shared/utils/helpers';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

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
    ChatBoxComponent,
  ],
  templateUrl: './layout-landing.component.html',
  styleUrl: './layout-landing.component.scss',
  standalone: true,
})
export class LayoutLandingComponent implements OnInit {
  // icon
  // faEnvelope = faEnvelope;
  // faPhone = faPhone;
  // faEarthAsia = faEarthAsia;
  // faFacebook = faFacebook;
  // faWhatsapp = faWhatsapp;

  // ======================== service ========================
  translate = inject(TranslateService);
  router = inject(Router);
  languageService = inject(LanguageService);
  appService = inject(AppService);
  faCaretDown = faCaretDown;
  languages: LanguageResDTO[] = [];
  selectedLang!: LanguageResDTO;
  formatImage = sanitizeUrl;
  isServiceActive = false;
  isMenuOpen = false;

  selectedServiceId: number | null = null;
  selectService(id: number) {
    this.selectedServiceId = id;
  }

  ngOnInit() {
    this.translate.use(this.languageService.locale);
    this.getDataVisaMenu();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isServiceActive = event.url.startsWith('/tab-service');
      });
    this.getDataFooter();
    this.getDataLanguages();
  }

  // ======================== Get data Language ========================
  getDataLanguages() {
    this.appService.getAllDataLanguage().subscribe(res => {
      this.languages = res.data;

      const langCode = localStorage.getItem('lang') ?? 'vi';
      this.selectedLang =
        this.languages.find(lang => lang.code === langCode) ??
        this.languages[0];
    });
  }
  // ======================== data Footer ========================
  dataVisaMenu: VisaServiceResDTO[] = [];
  getDataVisaMenu() {
    this.appService.getAllDataMenuService().subscribe(res => {
      this.dataVisaMenu = res.data;
    });
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleChangeLanguage(lang: LanguageResDTO) {
    this.selectedLang = lang;
    this.languageService.setLanguage(lang.code);
    location.reload();
  }

  // ======================== Get data Footer ========================
  footerData: FooterResDTO[] = [];
  getDataFooter() {
    this.appService.getAllDataFooter().subscribe(res => {
      this.footerData = res.data;
      console.log(this.footerData);
    });
  }
}
