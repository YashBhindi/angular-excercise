import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { RegisterComponent } from './auth/containers/register/register.component';

import { RandomGuard } from './auth/guards/random.guard';
import { HomeComponent } from './base/components/home/home.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadChildren : './base/base.module#BaseModule'
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  },
  {
    path: 'secret-random-number',
    loadChildren: './random/random.module#RandomModule',
    canActivate: [RandomGuard],
    canLoad: [RandomGuard]
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule',
    canActivate: [RandomGuard],
    canLoad: [RandomGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
