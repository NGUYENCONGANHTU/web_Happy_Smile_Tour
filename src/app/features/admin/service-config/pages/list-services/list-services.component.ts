import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableMetaData } from '../../../../../shared/models/table-base.model';
import { BlogResDTO } from '../../../blog/blog.interface';
import { ColumnConfig } from '../../../../../shared/interfaces/table-base.interface';
import { HeaderInputSearchComponent } from '../../../../../shared/components/header-input-search/header-input-search.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableBaseComponent } from '../../../../../shared/components/table-base/table-base.component';
import { ServiceConfigService } from '../../service-config.service';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-list-services',
  templateUrl: 'list-services.component.html',
  standalone: true,
  imports: [
    HeaderInputSearchComponent,
    NzButtonModule,
    NzIconModule,
    TableBaseComponent,
  ],
})
export class ListServicesComponent implements OnInit {
  router = inject(Router);
  serviceConfigService = inject(ServiceConfigService);

  loading = false;

  searchKey = '';
  metaData = new TableMetaData();
  data: BlogResDTO[] = [];
  columns: ColumnConfig[] = [
    {
      key: 'name',
      title: 'Tên Dịch Vụ', // From 'name' property
      width: '250px',
    },
    {
      key: 'bannerTitle',
      title: 'Tiêu đề Banner', // From 'bannerTitle' property
      width: '250px',
    },
    {
      key: 'phone',
      title: 'Số điện thoại', // From 'phone' property
      width: '150px',
    },
    {
      key: 'serviceTitle',
      title: 'Tiêu đề Dịch vụ', // From 'serviceTitle' property
      width: '250px',
    },
  ];

  ngOnInit() {
    this.getServices();
  }

  getServices(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.serviceConfigService.getServices().subscribe({
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
        this.router.navigate(['admin', 'service-config', 'create']);
        break;
      case BaseFormMode.UPDATE:
        this.router.navigate(['admin', 'service-config', data?.id, 'update']);
        break;
      case BaseFormMode.VIEW:
        this.router.navigate(['admin', 'service-config', data?.id, 'update']);
        break;
      default:
    }
  }

  protected readonly BaseFormMode = BaseFormMode;

  get displayData() {
    return this.data.filter(dt =>
      Object.values(dt).some(
        val =>
          typeof val === 'string' &&
          val.toLowerCase().includes(this.searchKey.toLowerCase())
      )
    );
  }
}
