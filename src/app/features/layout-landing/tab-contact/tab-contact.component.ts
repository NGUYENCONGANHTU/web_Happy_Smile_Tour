import { Component, inject, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPhoneVolume,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../../../../app.service';
import { ContactPageResDTO, BannerResDTO } from '../../../../interface';
import { NgStyle } from '@angular/common';
import { sanitizeUrl } from '../../../shared/utils/helpers';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tab-contact',
  imports: [FaIconComponent, NgStyle],
  templateUrl: './tab-contact.component.html',
  standalone: true,
  styleUrl: './tab-contact.component.scss',
})
export class TabContactComponent implements OnInit {
  faPhoneVolume = faPhoneVolume;
  faEnvelope = faEnvelope;
  faLocationDot = faLocationDot;

  appService = inject(AppService);

  formateImage = sanitizeUrl;

  ngOnInit() {
    this.getAllDataBanner();
    this.getAllDataPhone();
    this.getAllDataAddress();
    this.getAllDataEmail();
  }

  // ================== BANNER =======================
  dataBanner: BannerResDTO[] = [];
  getAllDataBanner() {
    this.appService.getAlLDataBannerContact().subscribe(res => {
      if (res?.data) {
        this.dataBanner = res.data;
      } else {
        this.dataBanner = [];
      }
    });
  }

  // ================== PHONE =======================
  dataPhone: ContactPageResDTO[] = [];
  getAllDataPhone() {
    this.appService.getAllDataPhoneContactPage().subscribe(res => {
      if (res?.data) {
        this.dataPhone = res.data;
      } else {
        this.dataPhone = [];
      }
    });
  }

  // ================== ADDRESS =======================
  dataAddress: ContactPageResDTO[] = [];
  getAllDataAddress() {
    this.appService.getAllDataAddressContactPage().subscribe(res => {
      if (res?.data) {
        this.dataAddress = res.data;
      } else {
        this.dataAddress = [];
      }
    });
  }
  // ================== Email =======================
  dataEmail: ContactPageResDTO[] = [];
  getAllDataEmail() {
    this.appService.getAllDataEmailContactPage().subscribe(res => {
      if (res?.data) {
        this.dataEmail = res.data;
      } else {
        this.dataEmail = [];
      }
    });
  }

  private sanitizer = inject(DomSanitizer);
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
