import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { HeaderInputSearchComponent } from '../../../../../shared/components/header-input-search/header-input-search.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableBaseComponent } from '../../../../../shared/components/table-base/table-base.component';
import { Router } from '@angular/router';
import { TableMetaData } from '../../../../../shared/models/table-base.model';
import {
  ColumnConfig,
  ColumnType,
} from '../../../../../shared/interfaces/table-base.interface';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ClientCommentService } from '../../client-comment.service';
import { ClientCommentResDTO } from '../../client-comment.interface';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DEFAULT_FALLBACK } from '../../../../../shared/constants/global.constant';
import { ViewClientCommentContentComponent } from '../../components/view-client-comment-content/view-client-comment-content.component';

@Component({
  selector: 'app-list-client-comment',
  templateUrl: 'list-client-comment.component.html',
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
export class ListClientCommentComponent implements OnInit {
  @ViewChild('image', { static: true }) imageCol!: TemplateRef<never>;
  @ViewChild('actionCol', { static: true }) actionCol!: TemplateRef<never>;
  @ViewChild('tourLinkCol', { static: true }) tourLinkCol!: TemplateRef<never>;

  router = inject(Router);
  clientCommentService = inject(ClientCommentService);
  modal = inject(NzModalService);

  loading = false;

  searchKey = '';
  metaData = new TableMetaData();
  data: ClientCommentResDTO[] = [];
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
        key: 'rate',
        title: 'Đánh giá',
      },
      {
        key: 'content',
        title: 'Nội dung',
      },
      {
        key: 'tagDisplay',
        title: 'Tags',
      },
      {
        key: 'time',
        title: 'Thời gian',
      },
      {
        key: 'tourId',
        title: 'Tour',
        type: ColumnType.TEMPLATE_REF,
        template: this.tourLinkCol,
      },
      {
        key: 'id',
        title: '',
        width: '64px',
        fixed: 'right',
        type: ColumnType.TEMPLATE_REF,
        template: this.actionCol,
      },
    ];
    this.getClientContacts();
  }

  getClientContacts(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.clientCommentService.getClientComments().subscribe({
      next: res => {
        this.data = res.data.map(dt => ({
          ...dt,
          imageUrl: dt.imageUrl,
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  viewDetail(data: ClientCommentResDTO) {
    this.modal.create({
      nzTitle: 'Chi tiết đánh giá',
      nzContent: ViewClientCommentContentComponent,
      nzData: data,
      nzFooter: null,
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
        this.clientCommentService.deleteClientCommentById(id).subscribe({
          next: () => {
            this.getClientContacts(false);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
      },
    });
  }

  goToDetail(id: string | number) {
    this.router.navigateByUrl(`/admin/tour-config/${id}`);
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
