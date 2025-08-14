import { ListServicesComponent } from './pages/list-services/list-services.component';
import { Routes } from '@angular/router';
import { CreateVisaServiceComponent } from './pages/create-visa-service/create-visa-service.component';
import { UpdateVisaServiceComponent } from './pages/update-visa-service/update-visa-service.component';
import { ViewVisaServiceComponent } from './pages/view-visa-service/view-visa-service.component';

export const SERVICE_CONFIG_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ListServicesComponent,
  },
  {
    path: 'create',
    component: CreateVisaServiceComponent,
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
        component: ViewVisaServiceComponent,
      },
      {
        path: 'update',
        component: UpdateVisaServiceComponent,
      },
    ],
  },
];
