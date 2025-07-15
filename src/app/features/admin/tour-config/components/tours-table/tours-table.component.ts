import { Component, inject, Input } from '@angular/core';
import { TableBaseComponent } from '../../../../../shared/components/table-base/table-base.component';
import { TourResDTO, TourType } from '../../interface';
import { ColumnConfig } from '../../../../../shared/interfaces/table-base.interface';
import { TableMetaData } from '../../../../../shared/models/table-base.model';
import { MOCK_TOURS } from '../../consts';
import { HeaderInputSearchComponent } from '../../../../../shared/components/header-input-search/header-input-search.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tours-table',
  templateUrl: 'tours-table.component.html',
  imports: [
    TableBaseComponent,
    HeaderInputSearchComponent,
    NzButtonModule,
    NzIconModule,
  ],
  standalone: true,
})
export class ToursTableComponent {
  router = inject(Router);

  @Input({ required: true }) type!: TourType;
  @Input() data: TourResDTO[] = MOCK_TOURS;
  @Input() columns: ColumnConfig[] = [
    {
      key: 'title',
      title: 'Tên Tour',
      width: '250px',
    },
    {
      key: 'stayDate',
      title: 'Thời gian',
      width: '120px',
    },
    {
      key: 'location.name',
      title: 'Khởi hành từ',
      width: '150px',
    },
    {
      key: 'destination',
      title: 'Điểm đến',
      width: '180px',
    },
    {
      key: 'finalPrice',
      title: 'Giá cuối',
      width: '120px',
    },
    {
      key: 'star',
      title: 'Đánh giá',
      width: '100px',
    },
    {
      key: 'numberComment',
      title: 'Lượt đánh giá',
      width: '100px',
    },
  ];

  loading = false;
  metaData = new TableMetaData();

  getTours() {
    console.log('get tours');
  }

  handleFilterChange(_event: {
    columnKey: string;
    value: any;
    filter: Record<string, any>;
    data?: Record<string, any>;
  }) {
    this.getTours();
  }

  goTo(target: string) {
    switch (target) {
      case BaseFormMode.CREATE:
        this.router.navigate([
          'admin',
          'tour-config',
          this.type.toLowerCase(),
          'create',
        ]);
        break;
      default:
    }
  }

  protected readonly BaseFormMode = BaseFormMode;
}
