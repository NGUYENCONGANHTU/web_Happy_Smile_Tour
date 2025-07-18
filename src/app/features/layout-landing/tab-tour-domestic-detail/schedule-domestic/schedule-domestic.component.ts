import { Component, Input } from '@angular/core';
import {
  NzTimelineComponent,
  NzTimelineItemComponent,
} from 'ng-zorro-antd/timeline';

import {
  NzCollapseComponent,
  NzCollapsePanelComponent,
} from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ScheduleResDTO } from '../../tab-tour-foreign-detail/schedule/schedule-interface';
@Component({
  selector: 'app-schedule-domestic',
  imports: [
    NzTimelineComponent,
    NzTimelineItemComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconModule,
  ],
  templateUrl: './schedule-domestic.component.html',
  styleUrl: './schedule-domestic.component.scss',
})
export class ScheduleDomesticComponent {
  @Input() tourDays: ScheduleResDTO[] = [];
}
