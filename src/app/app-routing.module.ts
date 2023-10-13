import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanboComponent } from './canbo/canbo.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './canbo/home/home.component';
import { ErrorComponent } from './error/error.component';
import { BaidangComponent } from './donvi/baidang/baidang.component';
import { HosothuctapComponent } from './donvi/hosothuctap/hosothuctap.component';
import { QlCanboComponent } from './donvi/ql-canbo/ql-canbo.component';
import { QlSinhvienthuctapComponent } from './donvi/ql-sinhvienthuctap/ql-sinhvienthuctap.component';
import { PhancongCanboComponent } from './donvi/phancong-canbo/phancong-canbo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'canbo',
    component: CanboComponent,
    canActivate: [AuthGuard],
    data: { roles: ['student'] },
  },
  {
    path: 'unit',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['unit'] },
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['unit'] },
      },
      {
        path: 'baidang',
        component: BaidangComponent,
        canActivate: [AuthGuard],
        data: { roles: ['unit'] },
      },
      {
        path: 'hosothuctap',
        component: HosothuctapComponent,
        canActivate: [AuthGuard],
        data: { roles: ['unit'] },
      },
      {
        path: 'ql-canbo',
        component: QlCanboComponent,
        canActivate: [AuthGuard],
        data: { roles: ['unit'] },
      },
      {
        path: 'ql-sinhvienthuctap',
        component: QlSinhvienthuctapComponent,
        canActivate: [AuthGuard],
        data: { roles: ['unit'] },
      },
      {
        path: 'phancong',
        component: PhancongCanboComponent,
        canActivate: [AuthGuard],
        data: { roles: ['unit'] },
      },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
