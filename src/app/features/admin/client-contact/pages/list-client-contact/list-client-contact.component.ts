import { Component, inject, OnInit } from '@angular/core';
import { HeaderInputSearchComponent } from '../../../../../shared/components/header-input-search/header-input-search.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableBaseComponent } from '../../../../../shared/components/table-base/table-base.component';
import { Router } from '@angular/router';
import { TableMetaData } from '../../../../../shared/models/table-base.model';
import { BlogResDTO } from '../../../blog/blog.interface';
import { ColumnConfig } from '../../../../../shared/interfaces/table-base.interface';
import { ClientContactResDTO } from '../../client-contact.interface';
import { ClientContactService } from '../../client-contact.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewClientContactContentComponent } from '../../components/view-client-contact-content/view-client-contact-content.component';

@Component({
  selector: 'app-list-client-contact',
  templateUrl: 'list-client-contact.component.html',
  standalone: true,
  imports: [
    HeaderInputSearchComponent,
    NzButtonModule,
    NzIconModule,
    TableBaseComponent,
  ],
})
export class ListClientContactComponent implements OnInit {
  router = inject(Router);
  clientContactService = inject(ClientContactService);
  modal = inject(NzModalService);

  loading = false;
  metaData = new TableMetaData();
  data: BlogResDTO[] = [];
  columns: ColumnConfig[] = [
    {
      key: 'title',
      title: 'Tiêu đề',
      width: '300px',
    },
    {
      key: 'content',
      title: 'Nội dung',
    },
  ];

  ngOnInit() {
    this.getClientContacts();
  }

  getClientContacts(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.clientContactService.getClientContacts().subscribe({
      next: res => {
        this.data = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  viewDetail(data: ClientContactResDTO) {
    this.modal.create({
      nzTitle: 'Chi tiết thông tin',
      nzContent: ViewClientContactContentComponent,
      nzData: data,
      nzFooter: null,
    });
  }
}
