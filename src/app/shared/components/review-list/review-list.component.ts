import {Component, Input} from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TimeSincePipe } from '../../pipes/time-since.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';

interface ReviewItem {
  name: string;
  rate: number;
  time: string;
  tags: string[];
  content: string;
}

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  imports: [
    NzAvatarModule,
    NzRateModule,
    FormsModule,
    NzTagModule,
    TimeSincePipe,
    NzButtonModule
  ],
})
export class ReviewListComponent {
   @Input() reviews: ReviewItem[] = [
    {
      name: 'ngô nguyễn thu hà',
      rate: 5,
      time: '22/04/2025',
      tags: ['Hiệu năng Siêu mạnh mẽ', 'Thời lượng pin Cực khủng'],
      content: 'đc giảm giá nhiều, sẽ quay lại những lần sau',
    },
    {
      name: 'PHẠM LƯƠNG TRIỆU',
      rate: 5,
      time: '22/07/2025',
      tags: [
        'Hiệu năng Siêu mạnh mẽ',
        'Thời lượng pin Khủng',
        'Chất lượng tốt',
      ],
      content: 'Dùng làm máy chính khá ổn, cập nhật lên cao thì xài ngon hơn',
    },
  ];

  selectedFilter = 'all';
  filters = [
    { key: 'all', label: 'Tất cả' },
    { key: '5', label: '5 sao' },
    { key: '4', label: '4 sao' },
    { key: '3', label: '3 sao' },
    { key: '2', label: '2 sao' },
    { key: '1', label: '1 sao' },
  ];

  get filteredReviews(): ReviewItem[] {
    if (this.selectedFilter === 'all') return this.reviews;
    return this.reviews.filter((r) => r.rate.toString() === this.selectedFilter);
  }

  onFilter(key: string): void {
    this.selectedFilter = key;
  }
}
