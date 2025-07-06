import { Component, inject, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPhoneVolume,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../../../../app.service';
import { ContactPageResDTO } from '../../../../interface';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-tab-contact',
  imports: [FaIconComponent, NgStyle, NgIf],
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
    this.getAllDataBannerContactPage();
    this.getAllDataPhoneContactPage();
    this.getAllDataEmailContactPage();
    this.getAllDataAddressContactPage();
  }
  // api contact Banner
  dataContactBanner: ContactPageResDTO[] = [];
  getAllDataBannerContactPage() {
    this.appService.getAllDataBannerContactPage().subscribe(data => {
      this.dataContactBanner = data;
    });
  }

  // api contact Phone
  dataContactPhone: ContactPageResDTO[] = [];
  getAllDataPhoneContactPage() {
    this.appService.getAllDataPhoneContactPage().subscribe(data => {
      this.dataContactPhone = data;
    });
  }

  // api contact Email
  dataContactEmail: ContactPageResDTO[] = [];
  getAllDataEmailContactPage() {
    this.appService.getAllDataEmailContactPage().subscribe(data => {
      this.dataContactEmail = data;
    });
  }

  // api contact Address
  dataContactAddress: ContactPageResDTO[] = [];
  getAllDataAddressContactPage() {
    this.appService.getAllDataAddressContactPage().subscribe(data => {
      this.dataContactAddress = data;
    });
  }
}
