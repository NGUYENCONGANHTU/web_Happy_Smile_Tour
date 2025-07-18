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

  faCaretDown = faCaretDown;
  languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'cn', name: '中文', flag: 'cn' },
  ];

  isServiceActive = false;

  selectedServiceId: number | null = null;
  selectService(id: number) {
    this.selectedServiceId = id;
  }

  router = inject(Router);
  ngOnInit() {
    this.translate.use('en');
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
}
