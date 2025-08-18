import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableMetaData } from '../../../../../shared/models/table-base.model';
import { ColumnConfig } from '../../../../../shared/interfaces/table-base.interface';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';
import { HeaderInputSearchComponent } from '../../../../../shared/components/header-input-search/header-input-search.component';
import { TableBaseComponent } from '../../../../../shared/components/table-base/table-base.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BlogService } from '../../blog.service';
import { BlogResDTO } from '../../blog.interface';
import { getHtmlSnippet } from '../../../../../shared/utils/helpers/common.helper';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  imports: [
    HeaderInputSearchComponent,
    TableBaseComponent,
    NzIconModule,
    NzButtonModule,
  ],
  standalone: true,
})
export class BlogListComponent implements OnInit {
  router = inject(Router);
  blogService = inject(BlogService);

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
    this.getBlogs();
  }

  getBlogs(toggleLoading = true) {
    if (toggleLoading) {
      this.loading = true;
    }
    this.blogService.getBlogs().subscribe({
      next: res => {
        this.data = res.data.map(dt => ({
          ...dt,
          content: getHtmlSnippet(dt.content ?? ''),
        }));
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
        this.router.navigate(['admin', 'blog-config', 'create']);
        break;
      case BaseFormMode.UPDATE:
        this.router.navigate(['admin', 'blog-config', data?.id, 'update']);
        break;
      case BaseFormMode.VIEW:
        this.router.navigate(['admin', 'blog-config', data?.id, 'update']);
        break;
      default:
    }
  }

  protected readonly BaseFormMode = BaseFormMode;
}
