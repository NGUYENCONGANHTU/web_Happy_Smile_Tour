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
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
  // icon
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faEarthAsia = faEarthAsia;
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;
  //
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

  footerData: FooterRequest = {
    name: 'Ms Christine Huong',
    position: 'General Director',
    company: 'HAPPYSMILES VIETNAM TRAVEL COMPANY LTD',
    address:
      'Room 201, Upland Office Building, 146 Hoang Quoc Viet Street, Nghia Tan Ward, Cau Giay Dist, Ha Noi, Vietnam.',
    taxCode: '0110665455',
    licenseNumber: '01-2627/2024/CDLQGVN-GP LHQT',
    website: 'www.happysmilesvietnam.com',
    email: 'happysmilesvn@gmail.com',
    mobileNumber: '+84 912 88 33 47',
    whatsappNumber: '+84 966 788 728',
  };
}
export interface FooterRequest {
  name?: string;
  position?: string;
  company?: string;
  address?: string;
  taxCode?: string;
  licenseNumber?: string;
  website?: string;
  email?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
}
