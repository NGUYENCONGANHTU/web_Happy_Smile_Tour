import { Component, inject, OnInit } from '@angular/core';
import { TableBaseComponent } from '../../../../../shared/components/table-base/table-base.component';
import { TourResDTO } from '../../interface';
import { ColumnConfig } from '../../../../../shared/interfaces/table-base.interface';
import { TableMetaData } from '../../../../../shared/models/table-base.model';
import { HeaderInputSearchComponent } from '../../../../../shared/components/header-input-search/header-input-search.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';
import { Router } from '@angular/router';
import { TourConfigService } from '../../tour-config.service';

@Component({
  selector: 'app-list-tours',
  templateUrl: 'list-tours.component.html',
  imports: [
    TableBaseComponent,
    HeaderInputSearchComponent,
    NzButtonModule,
    NzIconModule,
  ],
  standalone: true,
})
export class ListToursComponent implements OnInit {
  router = inject(Router);
  tourConfigService = inject(TourConfigService);

  loading = false;
  metaData = new TableMetaData();
  data: TourResDTO[] = [];
  columns: ColumnConfig[] = [
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

  ngOnInit() {
    this.getTours();
  }

  getTours(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.tourConfigService.getTours().subscribe({
      next: res => {
        this.data = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  goTo(target: string, data?: any) {
    switch (target) {
      case BaseFormMode.CREATE:
        this.router.navigate(['admin', 'tour-config', 'create']);
        break;
      case BaseFormMode.UPDATE:
        this.router.navigate(['admin', 'tour-config', 'update']);
        break;
      case BaseFormMode.VIEW:
        this.router.navigate(['admin', 'tour-config', data?.id, 'view']);
        break;
      default:
    }
  }

  protected readonly BaseFormMode = BaseFormMode;
}
