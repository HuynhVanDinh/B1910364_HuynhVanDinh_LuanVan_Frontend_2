import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanboComponent } from './canbo/canbo.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { BaidangComponent } from './donvi/baidang/baidang.component';
import { HosothuctapComponent } from './donvi/hosothuctap/hosothuctap.component';
import { QlCanboComponent } from './donvi/ql-canbo/ql-canbo.component';
import { QlSinhvienthuctapComponent } from './donvi/ql-sinhvienthuctap/ql-sinhvienthuctap.component';
import { DanhsachPhancongComponent } from './donvi/danhsach-phancong/danhsach-phancong.component';
import { PhancongCongviecComponent } from './canbo/phancong-congviec/phancong-congviec.component';
import { CongviecSinhvienComponent } from './canbo/congviec-sinhvien/congviec-sinhvien.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'canbo',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['cadre'] },
    children: [
      // {
      //   path: '',
      //   component: HomeComponent,
      //   canActivate: [AuthGuard],
      //   data: { roles: ['cadre'] },
      // },
      {
        path: 'phancong-congviec',
        component: PhancongCongviecComponent,
        canActivate: [AuthGuard],
        data: { roles: ['cadre'] },
      },
      {
        path: 'test',
        component: CongviecSinhvienComponent,
        canActivate: [AuthGuard],
        data: { roles: ['cadre'] },
      },
    ],
  },
  {
    path: 'unit',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['unit'] },
    children: [
      // {
      //   path: '',
      //   component: HomeComponent,
      //   canActivate: [AuthGuard],
      //   data: { roles: ['unit'] },
      // },
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
        component: DanhsachPhancongComponent,
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
