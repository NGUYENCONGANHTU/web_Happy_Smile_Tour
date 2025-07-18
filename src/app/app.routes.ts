import { Routes } from '@angular/router';
import { IntroduceComponent } from './features/layout-landing/introduce/introduce.component';
import { LayoutLandingComponent } from './features/layout-landing/layout-landing.component';
import { HomeComponent } from './features/layout-landing/home/home.component';
import { TabTourFeatureDomesticComponent } from './features/layout-landing/tab-tour-feature-domestic/tab-tour-feature-domestic.component';
import { TabTourFeatureForeignComponent } from './features/layout-landing/tab-tour-feature-foreign/tab-tour-feature-foreign.component';
import { PrivateGroupTourComponent } from './features/layout-landing/private-group-tour/private-group-tour.component';
import { TabContactComponent } from './features/layout-landing/tab-contact/tab-contact.component';
import { TabTourDomesticDetailComponent } from './features/layout-landing/tab-tour-domestic-detail/tab-tour-domestic-detail.component';
import { TabTourForeignDetailComponent } from './features/layout-landing/tab-tour-foreign-detail/tab-tour-foreign-detail.component';
import { TabServiceComponent } from './features/layout-landing/tab-service/tab-service.component';
import { LoginPageComponent } from './core/auth/pages/login-page/login-page.component';
import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { HomeConfigComponent } from './features/admin/home-config/home-config.component';
import { ContactConfigComponent } from './features/admin/contact-config/contact-config.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ListServicesComponent } from './features/admin/service-config/pages/list-services/list-services.component';
import { TabTravelGuideDetailComponent } from './features/layout-landing/tab-travel-guide-detail/tab-travel-guide-detail.component';
import { TOUR_CONFIG_ROUTE } from './features/admin/tour-config/tour-config.routes';
// import {AuthGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: LayoutLandingComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'introduce',
        component: IntroduceComponent,
      },
      {
        path: 'tour-feature-domestic',
        component: TabTourFeatureDomesticComponent,
      },
      {
        path: 'tour-feature-foreign',
        component: TabTourFeatureForeignComponent,
      },
      {
        path: 'private-group-tour',
        component: PrivateGroupTourComponent,
      },
      {
        path: 'contact-page',
        component: TabContactComponent,
      },
      {
        path: 'tab-tour-domestic-detail',
        component: TabTourDomesticDetailComponent,
      },
      {
        path: 'tab-tour-foreign-detail/:id',
        component: TabTourForeignDetailComponent,
      },
      {
        path: 'travel-guide-detail/:id',
        component: TabTravelGuideDetailComponent,
      },
      {
        path: 'tab-service/:id',
        component: TabServiceComponent,
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'auth',
        component: LoginPageComponent,
      },
      {
        path: '',
        component: AdminLayoutComponent,
        // canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: { breadcrumb: 'Dashboard' },
          },
          {
            path: 'home-config',
            component: HomeConfigComponent,
            data: { breadcrumb: 'Cấu hình trang chủ' },
          },
          {
            path: 'contact-config',
            component: ContactConfigComponent,
            data: { breadcrumb: 'Cấu hình liên hệ' },
          },
          {
            path: 'service-config',
            data: { breadcrumb: 'Cấu hình liên hệ' },
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
              },
              {
                path: 'list',
                component: ListServicesComponent,
              },
            ],
          },
          {
            path: 'tour-config',
            children: TOUR_CONFIG_ROUTE,
            data: { breadcrumb: 'Cấu hình tour' },
          },
        ],
      },
    ],
  },
];
