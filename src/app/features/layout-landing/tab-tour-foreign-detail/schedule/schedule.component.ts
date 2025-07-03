import { Component } from '@angular/core';
import {NzTimelineComponent, NzTimelineItemComponent} from 'ng-zorro-antd/timeline';
import {NgForOf} from '@angular/common';
import {NzCollapseComponent, NzCollapsePanelComponent} from 'ng-zorro-antd/collapse';
import {NzIconModule} from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-schedule',
  imports: [
    NzTimelineComponent,
    NzTimelineItemComponent,
    NgForOf,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzIconModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  tourDays = [
    {
      title: 'HÀ NỘI - THƯỢNG HẢI - TÔ CHÂU',
      meal: 'Ăn trưa MB, tối',
      detail: 'Chi tiết hành trình ngày 1...'
    },
    {
      title: 'TÔ CHÂU - HÀNG CHÂU',
      meal: 'Ăn sáng, trưa, tối',
      detail: 'Chi tiết hành trình ngày 2...'
    },
    {
      title: 'TÔ CHÂU - HÀNG CHÂU',
      meal: 'Ăn sáng, trưa, tối',
      detail: 'Chi tiết hành trình ngày 2...'
    },
    {
      title: 'TÔ CHÂU - HÀNG CHÂU',
      meal: 'Ăn sáng, trưa, tối',
      detail: 'Chi tiết hành trình ngày 2...'
    },
    {
      title: 'TÔ CHÂU - HÀNG CHÂU',
      meal: 'Ăn sáng, trưa, tối',
      detail: 'Chi tiết hành trình ngày 2...'
    },
    {
      title: 'TÔ CHÂU - HÀNG CHÂU',
      meal: 'Ăn sáng, trưa, tối',
      detail: 'Chi tiết hành trình ngày 2...'
    },
  ];
}
