import { Component, inject, Input } from '@angular/core';
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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../../translatepipe';
import { SafeHtmlPipe } from '../../../../shared/utils/helpers/safe-html.pipe';
@Component({
  selector: 'app-schedule',
  imports: [
    NzTimelineComponent,
    NzTimelineItemComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconModule,
    TranslatePipe,
    SafeHtmlPipe,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  @Input() tourDays: ScheduleResDTO[] = [];
  private sanitizer = inject(DomSanitizer);
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
