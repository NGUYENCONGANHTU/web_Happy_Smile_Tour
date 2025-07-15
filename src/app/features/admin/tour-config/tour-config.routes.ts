import { Routes } from '@angular/router';
import { CreateDomesticTourComponent } from './pages/domestic/pages/create-domestic-tour/create-domestic-tour.component';
import { ListDomesticToursComponent } from './pages/domestic/pages/list-domestic-tours/list-domestic-tours.component';
import { TourFormComponent } from './components/tour-form/pages/tour-form.component';
import { ListForeignToursComponent } from './pages/foreign/pages/list-foreign-tours/list-foreign-tours.component';
import { ListPrivateToursComponent } from './pages/private/pages/list-private-tours/list-private-tours.component';
import { ViewDomesticTourComponent } from './pages/domestic/pages/view-domestic-tour/view-domestic-tour.component';

export const TOUR_CONFIG_ROUTE: Routes = [
  {
    path: '',
    redirectTo: 'domestic',
    pathMatch: 'full',
  },
  {
    path: 'domestic',
    data: { breadcrumb: 'Cấu hình tour trong nước' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateDomesticTourComponent,
        data: { breadcrumb: 'Tạo mới' },
      },
      {
        path: 'list',
        component: ListDomesticToursComponent,
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
            component: ViewDomesticTourComponent,
            data: { breadcrumb: 'Chi tiết tour' },
          },
          {
            path: 'update',
            component: ViewDomesticTourComponent,
            data: { breadcrumb: 'Cập nhật tour' },
          },
        ],
      },
    ],
  },
  {
    path: 'foreign',
    data: { breadcrumb: 'Cấu hình tour nước ngoài' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: TourFormComponent,
      },
      {
        path: 'list',
        component: ListForeignToursComponent,
      },
    ],
  },
  {
    path: 'private',
    data: { breadcrumb: 'Cấu hình tour cá nhân' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: TourFormComponent,
      },
      {
        path: 'list',
        component: ListPrivateToursComponent,
      },
    ],
  },
];
