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
import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { HomeConfigComponent } from './features/admin/home-config/home-config.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { TabTravelGuideDetailComponent } from './features/layout-landing/tab-travel-guide-detail/tab-travel-guide-detail.component';
import { TOUR_CONFIG_ROUTES } from './features/admin/tour-config/tour-config.routes';
import { BLOG_ROUTES } from './features/admin/blog/blog.routes';
import { SERVICE_CONFIG_ROUTES } from './features/admin/service-config/service-config.routes';
import { ListLanguageComponent } from './features/admin/language-config/pages/list-language/list-language.component';
import { ListClientContactComponent } from './features/admin/client-contact/pages/list-client-contact/list-client-contact.component';
import { ListClientCommentComponent } from './features/admin/client-comment/pages/list-client-comment/list-client-comment.component';
import { AuthRoutes } from './features/auth/auth.routes';
import { AuthGuard } from './core/guards/auth.guard';
import {ListLocationComponent} from './features/admin/location-config/pages/list-location/list-location.component';
// import {AuthGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    children: AuthRoutes,
  },
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
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
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
            path: 'service-config',
            data: { breadcrumb: 'Cấu hình dịch vụ' },
            children: SERVICE_CONFIG_ROUTES,
          },
          {
            path: 'tour-config',
            children: TOUR_CONFIG_ROUTES,
            data: { breadcrumb: 'Cấu hình tour' },
          },
          {
            path: 'blog-config',
            children: BLOG_ROUTES,
            data: { breadcrumb: 'Bài viết' },
          },
          {
            path: 'language-config',
            component: ListLanguageComponent,
            data: { breadcrumb: 'Ngôn ngữ' },
          },
          {
            path: 'client-contact',
            component: ListClientContactComponent,
            data: { breadcrumb: 'Form liên hệ' },
          },
          {
            path: 'client-comment',
            component: ListClientCommentComponent,
            data: { breadcrumb: 'Đánh giá của khách hàng' },
          },
          {
            path: 'location-config',
            component: ListLocationComponent,
            data: { breadcrumb: 'Cấu hình địa điểm' },
          },
        ],
      },
    ],
  },
];
