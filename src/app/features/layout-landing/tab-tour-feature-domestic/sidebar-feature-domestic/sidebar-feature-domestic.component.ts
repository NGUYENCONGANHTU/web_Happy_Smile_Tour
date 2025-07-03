import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import {DecimalPipe, NgForOf} from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-sidebar-feature-domestic',
  imports: [
    NzButtonModule,
    NzCheckboxModule,
    NzCollapseModule,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
    NzSliderModule,
    RouterLinkActive,
    RouterLink,
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './sidebar-feature-domestic.component.html',
  styleUrl: './sidebar-feature-domestic.component.scss',
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class SidebarFeatureDomesticComponent {
  // Ngân sách
    rangeValue: number[] = [0, 200000000];
  // Điểm đi và điểm đến
    departure: string = '';
    destination: string = '';
  // Chủ đề
    selectedTopics: number[] = [];
    topics = [
      { id: 1, name: 'Chùm tour Châu Âu hoa lệ' },
      { id: 2, name: 'Chùm tour du lịch Hà Nội' },
    ];


    onTopicChange(topic: any): void {
      const index = this.selectedTopics.indexOf(topic.id);
      if (index > -1) {
        this.selectedTopics.splice(index, 1);
      } else {
        this.selectedTopics.push(topic.id);
      }
    }
    searchTour(): void {
      const formData = {
        range: this.rangeValue,
        departure: this.departure,
        destination: this.destination,
        selectedTopics: this.selectedTopics
      };

      console.log('Form data:', formData);
    }

    tabs = [
      {
        tabName:'Trong nước',
        href:'/tour-feature-domestic'
      },
      {
        tabName:'Nước ngoài',
        href:'/tour-feature-foreign'
      }
    ]
}
