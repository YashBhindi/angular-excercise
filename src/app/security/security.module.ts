import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SecurityRoutingModule } from './security-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class SecurityModule {
  constructor() {
    console.log('Security module loaded');
  }
}
