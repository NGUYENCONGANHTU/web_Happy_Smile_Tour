import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ClientOpinionService } from '../../client-opinion.service';
import { NzImageModule } from 'ng-zorro-antd/image';
import { TableMetaData } from '../../../../../../../shared/models/table-base.model';
import {
  ColumnConfig,
  ColumnType,
} from '../../../../../../../shared/interfaces/table-base.interface';
import { TableBaseComponent } from '../../../../../../../shared/components/table-base/table-base.component';
import { HeaderInputSearchComponent } from '../../../../../../../shared/components/header-input-search/header-input-search.component';
import { DEFAULT_FALLBACK } from '../../../../../../../shared/constants/global.constant';
import { ClientOpinionResDTO } from '../../client-opinion.interface';
import { ViewClientOpinionContentComponent } from '../../components/view-client-comment-content/view-client-opinion-content.component';
import { sanitizeUrl } from '../../../../../../../shared/utils/helpers/common.helper';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-client-opinion',
  templateUrl: 'list-client-opinion.component.html',
  standalone: true,
  imports: [
    HeaderInputSearchComponent,
    NzButtonModule,
    NzIconModule,
    TableBaseComponent,
    NzModalModule,
    NzImageModule,
  ],
})
export class ListClientOpinionComponent implements OnInit {
  @ViewChild('image', { static: true }) imageCol!: TemplateRef<never>;
  @ViewChild('actionCol', { static: true }) actionCol!: TemplateRef<never>;

  router = inject(Router);
  clientOpinionService = inject(ClientOpinionService);
  modal = inject(NzModalService);
  message = inject(NzMessageService);

  loading = false;

  searchKey = '';
  metaData = new TableMetaData();
  data: ClientOpinionResDTO[] = [];
  columns: ColumnConfig[] = [];

  ngOnInit() {
    this.columns = [
      {
        key: 'imageUrl',
        title: 'Ảnh',
        type: ColumnType.TEMPLATE_REF,
        template: this.imageCol,
      },
      {
        key: 'name',
        title: 'Tên',
      },
      {
        key: 'description',
        title: 'Mô tả',
      },
      {
        key: 'content',
        title: 'Nội dung',
      },
      // {
      //   key: 'rate',
      //   title: 'Đánh giá',
      // },
      {
        key: 'id',
        title: '',
        width: '64px',
        fixed: 'right',
        type: ColumnType.TEMPLATE_REF,
        template: this.actionCol,
      },
    ];
    this.getClientOpinions();
  }

  getClientOpinions(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.clientOpinionService.getClientOpinions().subscribe({
      next: res => {
        this.data = res.data.map(dt => ({
          ...dt,
          imageUrl: sanitizeUrl(dt.image?.storagePath ?? ''),
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openCreateOrUpdate(data?: ClientOpinionResDTO) {
    this.modal.create({
      nzTitle: `${data ? 'Cập nhật' : 'Tạo'} đánh giá`,
      nzContent: ViewClientOpinionContentComponent,
      nzData: data,
      nzFooter: null,
      nzOnOk: () => {
        this.message.success(data ? 'Cập nhật thành công.' : 'Tạo thành công.');
        this.getClientOpinions();
      },
    });
  }

  handleDelete(id: string | number) {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa?',
      nzOkText: 'Xác nhận',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.loading = true;
        this.clientOpinionService.deleteClientOpinionById(id).subscribe({
          next: () => {
            this.message.success('Xóa thành công.');
            this.getClientOpinions(false);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
      },
    });
  }

  get displayData() {
    return this.data.filter(dt =>
      Object.values(dt).some(
        val =>
          typeof val === 'string' &&
          val.toLowerCase().includes(this.searchKey.toLowerCase())
      )
    );
  }

  protected readonly DEFAULT_FALLBACK = DEFAULT_FALLBACK;
}
