import { Routes } from '@angular/router';
import { ListToursComponent } from './pages/list-tours/list-tours.component';
import { ViewTourComponent } from './pages/view-tour/view-tour.component';
import { CreateTourComponent } from './pages/create-tour/create-tour.component';
import { UpdateTourComponent } from './pages/update-tour/update-tour.component';
import { UpdateTourTransComponent } from './pages/update-tour-trans/update-tour-trans.component';

export const TOUR_CONFIG_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateTourComponent,
    data: { breadcrumb: 'Tạo mới' },
  },
  {
    path: 'list',
    component: ListToursComponent,
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
        component: ViewTourComponent,
        data: { breadcrumb: 'Chi tiết tour' },
      },
      {
        path: 'update',
        children: [
          {
            path: '',
            component: UpdateTourComponent,
          },
          {
            path: 'trans',
            component: UpdateTourTransComponent,
            data: { breadcrumb: 'Bản dịch' },
          },
        ],
        data: { breadcrumb: 'Cập nhật tour' },
      },
    ],
  },
];
