import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MyAuthService } from './services/auth.service';
import { RandomGuard } from './guards/random.guard';
import { TokenInterceptor } from './token.interceptor';
import { RegisterComponent } from './containers/register/register.component';
import {
  SocialLoginModule,
  AuthService,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angular-6-social-login";

const google_oauth_client_id: string = '448262434589-kk30obbvtsit6dqersqtqgogdp44opd7.apps.googleusercontent.com';
export let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_client_id)
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  providers: [
    AuthGuard,
    HttpClientModule,
    MyAuthService,
    RandomGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  exports : [LoginComponent, RegisterComponent]
})
export class AuthModule { }
