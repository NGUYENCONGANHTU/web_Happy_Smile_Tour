import { Component, inject, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPhoneVolume,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../../../../app.service';
import { IntroducePageResDTO } from '../../../../interface';
import { NgStyle } from '@angular/common';

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

  ngOnInit() {
    this.getAllDataBanner();
    this.getAllDataPhone();
    this.getAllDataAddress();
    this.getAllDataEmail();
  }

  // ================== BANNER =======================
  dataBanner: IntroducePageResDTO[] = [];
  getAllDataBanner() {
    this.appService.getAllDataBannerContactPage().subscribe(data => {
      this.dataBanner = data;
    });
  }

  // ================== PHONE =======================
  dataPhone: IntroducePageResDTO[] = [];
  getAllDataPhone() {
    this.appService.getAllDataPhoneContactPage().subscribe(data => {
      this.dataPhone = data;
    });
  }

  // ================== ADDRESS =======================
  dataAddress: IntroducePageResDTO[] = [];
  getAllDataAddress() {
    this.appService.getAllDataAddressContactPage().subscribe(data => {
      this.dataAddress = data;
    });
  }
  // ================== Email =======================
  dataEmail: IntroducePageResDTO[] = [];
  getAllDataEmail() {
    this.appService.getAllDataEmailContactPage().subscribe(data => {
      this.dataEmail = data;
    });
  }
}
