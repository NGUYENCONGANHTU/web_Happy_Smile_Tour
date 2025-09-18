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
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  ContentConfigService,
  ContentResDTO,
} from '../../content-config.service';
import { HeaderInputSearchComponent } from '../../../../../../../shared/components/header-input-search/header-input-search.component';
import { TableBaseComponent } from '../../../../../../../shared/components/table-base/table-base.component';
import { LanguageSelectionComponent } from '../../../../../../../shared/components/language-selection/language-selection.component';
import {
  CONTENT_DATA_OPTIONS,
  ORIGINAL_LANGUAGE,
} from '../../../../../../../shared/constants/global.constant';
import { TableMetaData } from '../../../../../../../shared/models/table-base.model';
import {
  ColumnConfig,
  ColumnType,
} from '../../../../../../../shared/interfaces/table-base.interface';
import { ViewContentComponent } from '../../components/view-content/view-content.component';

@Component({
  selector: 'app-list-content',
  templateUrl: 'list-content.component.html',
  standalone: true,
  imports: [
    HeaderInputSearchComponent,
    NzButtonModule,
    NzIconModule,
    TableBaseComponent,
    NzModalModule,
    NzImageModule,
    LanguageSelectionComponent,
  ],
})
export class ListContentComponent implements OnInit {
  @ViewChild('actionCol', { static: true }) actionCol!: TemplateRef<never>;

  router = inject(Router);
  contentConfigService = inject(ContentConfigService);
  modal = inject(NzModalService);
  message = inject(NzMessageService);

  loading = false;
  selectedLanguage = ORIGINAL_LANGUAGE;
  searchKey = '';
  metaData = new TableMetaData();
  data: ContentResDTO[] = [];
  columns: ColumnConfig[] = [];

  ngOnInit() {
    this.columns = [
      {
        key: 'original',
        title: 'Tên (gốc)',
      },
      {
        key: 'value',
        title: 'Tên (dịch)',
      },
      {
        key: 'menuTypeLabel',
        title: 'Loại',
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
    this.fetchContentData();
  }

  fetchContentData(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.contentConfigService
      .getContentDataTrans(this.selectedLanguage)
      .subscribe({
        next: res => {
          this.data = res.data?.map(dt => ({
            ...dt,
            menuTypeLabel:
              CONTENT_DATA_OPTIONS.find(op => op.value === dt.menuType)
                ?.label ?? dt.menuType,
          }));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
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
        this.contentConfigService.deleteContentById(id).subscribe({
          next: () => {
            this.message.success('Xóa thành công.');
            this.fetchContentData(false);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
      },
    });
  }

  handleSelectedLanguageChange() {
    if (this.isOriginalLanguage) {
      this.columns = [
        {
          key: 'original',
          title: 'Tên (gốc)',
        },
        {
          key: 'value',
          title: 'Tên (dịch)',
        },
        {
          key: 'menuTypeLabel',
          title: 'Loại',
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
    } else {
      this.columns = [
        {
          key: 'original',
          title: 'Tên (gốc)',
        },
        {
          key: 'value',
          title: 'Tên (dịch)',
        },
        {
          key: 'menuTypeLabel',
          title: 'Loại',
        },
      ];
    }
    this.fetchContentData();
  }

  openCreateOrUpdate(data?: ContentResDTO) {
    this.modal.create({
      nzTitle: `${data ? 'Cập nhật' : 'Tạo'} nội dung`,
      nzContent: ViewContentComponent,
      nzData: data ? { ...data, languageCode: this.selectedLanguage } : null,
      nzFooter: null,
      nzOnOk: () => {
        this.message.success(data ? 'Cập nhật thành công.' : 'Tạo thành công.');
        this.fetchContentData(false);
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

  get isOriginalLanguage() {
    return this.selectedLanguage === ORIGINAL_LANGUAGE;
  }
}
