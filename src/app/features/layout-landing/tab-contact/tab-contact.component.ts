import { Component, inject, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPhoneVolume,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-tab-contact',
  imports: [FaIconComponent],
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
    this.getAllDataContactPage();
  }
  getAllDataContactPage() {
    console.log('dont let it empty!');
  }
}
