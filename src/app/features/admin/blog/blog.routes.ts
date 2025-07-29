import { Routes } from '@angular/router';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { ViewBlogComponent } from './pages/view-blog/view-blog.component';
import { UpdateBlogComponent } from './pages/update-blog/update-blog.component';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateBlogComponent,
    data: { breadcrumb: 'Tạo mới' },
  },
  {
    path: 'list',
    component: BlogListComponent,
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'view',
        component: ViewBlogComponent,
        data: { breadcrumb: 'Chi tiết bài viết' },
      },
      {
        path: 'update',
        component: UpdateBlogComponent,
        data: { breadcrumb: 'Cập nhật bài viêt' },
      },
    ],
  },
];
