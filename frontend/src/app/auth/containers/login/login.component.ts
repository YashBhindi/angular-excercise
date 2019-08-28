import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from '../../services/auth.service';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: MyAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private googleAuthService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      u_email: [''],
      u_password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.authService.login(
      {
        u_email: this.f.u_email.value,
        u_password: this.f.u_password.value
      }
    )
      .subscribe(success => {
        console.log(success);
        this.router.navigate(['/secret-random-number']);
      });
  }

  signInWithGoogle() {
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      if (userData) {
        this.authService.loginWithGoogle(userData).subscribe(success => {
          this.router.navigate(['/secret-random-number']);
        });
      }
    });
  }

}
