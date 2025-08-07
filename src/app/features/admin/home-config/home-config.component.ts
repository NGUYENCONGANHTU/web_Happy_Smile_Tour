import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FooterConfigComponent } from './components/footer-config/footer-config.component';
import { BannerConfigComponent } from './components/banner-config/banner-config.component';
import { PartnerConfigComponent } from './components/partner-config/partner-config.component';

@Component({
  standalone: true,
  selector: 'app-home-config',
  imports: [
    CommonModule,
    FormsModule,
    NzTabsModule,
    NzUploadModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    FooterConfigComponent,
    BannerConfigComponent,
    PartnerConfigComponent,
  ],
  templateUrl: './home-config.component.html',
})
export class HomeConfigComponent {
  banners: NzUploadFile[] = [];
  featuredTours: string[] = [];
  domesticTours: string[] = [];
  internationalTours: string[] = [];
  blogs: string[] = [];
  testimonials: string[] = [];
  clients: NzUploadFile[] = [];
}
