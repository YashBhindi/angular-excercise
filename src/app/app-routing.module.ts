import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloading } from './common/custom-preloading';
import { AuthGuardService } from './security/auth.guard';
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./security/security.module').then(mod => mod.SecurityModule),
    data: {
      preload: true
    }
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(mod => mod.StudentModule),
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: CustomPreloading
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
