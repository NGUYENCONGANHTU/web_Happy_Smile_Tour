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
import { LocationConfigService } from '../../location-config.service';
import { TableMetaData } from '../../../../../shared/models/table-base.model';
import { LocationResDTO } from '../../location-config.interface';
import {
  ColumnConfig,
  ColumnType,
} from '../../../../../shared/interfaces/table-base.interface';
import { TableBaseComponent } from '../../../../../shared/components/table-base/table-base.component';
import { HeaderInputSearchComponent } from '../../../../../shared/components/header-input-search/header-input-search.component';
import { LanguageSelectionComponent } from '../../../../../shared/components/language-selection/language-selection.component';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';
import { LocationType } from '../../../../../../interface';
import {ViewLocationContentComponent} from '../../components/view-location-content/view-location-content.component';

@Component({
  selector: 'app-list-location',
  templateUrl: 'list-location.component.html',
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
export class ListLocationComponent implements OnInit {
  @ViewChild('actionCol', { static: true }) actionCol!: TemplateRef<never>;

  router = inject(Router);
  locationService = inject(LocationConfigService);
  modal = inject(NzModalService);
  message = inject(NzMessageService);

  loading = false;
  selectedLanguage = ORIGINAL_LANGUAGE;
  searchKey = '';
  metaData = new TableMetaData();
  data: LocationResDTO[] = [];
  columns: ColumnConfig[] = [];

  ngOnInit() {
    this.columns = [
      {
        key: 'name',
        title: 'Tên',
      },
      {
        key: 'locationTypeLabel',
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
    this.fetchLocationTrans();
  }

  fetchLocationTrans(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.locationService.getLocationsTrans(this.selectedLanguage).subscribe({
      next: res => {
        this.data = res.data.map(dt => ({
          ...dt,
          locationTypeLabel: dt.locationType === LocationType.DOMESTIC ? 'Trong nước' : 'Quốc tế',
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
        this.locationService.deleteLocationById(id).subscribe({
          next: () => {
            this.message.success('Xóa thành công.');
            this.fetchLocationTrans(false);
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
    this.fetchLocationTrans();
  }

  openCreateOrUpdate(data?: LocationResDTO) {
    this.modal.create({
      nzTitle: `${data ? 'Cập nhật' : 'Tạo'} đánh giá`,
      nzContent: ViewLocationContentComponent,
      nzData: data ? { ...data, languageCode: this.selectedLanguage } : null,
      nzFooter: null,
      nzOnOk: () => {
        this.message.success(data ? 'Cập nhật thành công.' : 'Tạo thành công.');
        this.fetchLocationTrans(false);
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
