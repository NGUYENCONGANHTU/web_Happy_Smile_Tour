import { Routes } from '@angular/router';
import {IntroduceComponent} from './features/layout-landing/introduce/introduce.component';
import {LayoutLandingComponent} from './features/layout-landing/layout-landing.component';
import {HomeComponent} from './features/layout-landing/home/home.component';
import {
  TabTourFeatureDomesticComponent
} from './features/layout-landing/tab-tour-feature-domestic/tab-tour-feature-domestic.component';
import {
  TabTourFeatureForeignComponent
} from './features/layout-landing/tab-tour-feature-foreign/tab-tour-feature-foreign.component';
import {PrivateGroupTourComponent} from './features/layout-landing/private-group-tour/private-group-tour.component';
import {TabContactComponent} from './features/layout-landing/tab-contact/tab-contact.component';
import {AdminComponent} from './core/admin/admin.component';
import {
  TabTourDomesticDetailComponent
} from './features/layout-landing/tab-tour-domestic-detail/tab-tour-domestic-detail.component';
import {
  TabTourForeignDetailComponent
} from './features/layout-landing/tab-tour-foreign-detail/tab-tour-foreign-detail.component';
import {TestComponent} from './features/layout-landing/tab-tour-foreign-detail/test/test.component';
import {TabServiceComponent} from './features/layout-landing/tab-service/tab-service.component';

export const routes: Routes = [
  {
    path:'',
    component:LayoutLandingComponent,
    children: [
      {
        path:'',
        component:HomeComponent,
      },
      {
        path:'introduce',
        component:IntroduceComponent,
      },
      {
        path:'tour-feature-domestic',
        component:TabTourFeatureDomesticComponent,
      },
      {
        path:'tour-feature-foreign',
        component:TabTourFeatureForeignComponent,
      },
      {
        path:'private-group-tour',
        component:PrivateGroupTourComponent,
      },
      {
        path:'contact-page',
        component:TabContactComponent,
      },
      {
        path:'tab-tour-domestic-detail',
        component:TabTourDomesticDetailComponent,
      },
      {
        path:'tab-tour-foreign-detail',
        component:TabTourForeignDetailComponent,
      },
      {
        path:'tab-service',
        component:TabServiceComponent,
      }
    ]
  },
  {
    path:'admin',
    component:AdminComponent,
  },
  {
    path:'test',
    component:TestComponent,
  }
];
