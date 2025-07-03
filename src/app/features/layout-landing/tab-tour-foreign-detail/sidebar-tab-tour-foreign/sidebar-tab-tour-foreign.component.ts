import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {faCalendarDays, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidebar-tab-tour-foreign',
  imports: [NzDividerModule, FaIconComponent],
  templateUrl: './sidebar-tab-tour-foreign.component.html',
  styleUrl: './sidebar-tab-tour-foreign.component.scss'
})
export class SidebarTabTourForeignComponent {
  faCalendarDays=faCalendarDays;
  faLocationDot=faLocationDot;
}
