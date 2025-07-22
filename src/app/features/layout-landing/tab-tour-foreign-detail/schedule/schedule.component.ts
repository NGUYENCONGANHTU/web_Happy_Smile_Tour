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
import { ScheduleResDTO } from './schedule-interface';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-schedule',
  imports: [
    NzTimelineComponent,
    NzTimelineItemComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconModule,
    TranslatePipe,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  @Input() tourDays: ScheduleResDTO[] = [];
}
