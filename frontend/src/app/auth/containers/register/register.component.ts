import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { log } from 'util';
import { MyAuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sampleForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private googleAuthService: AuthService,
    private authService: MyAuthService) { }

  ngOnInit() {
    this.sampleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%?&])[A-Za-z0-9@$!%*?&]{8,}$")]],
      confPassword: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]
    }, { validator: this.CrossFeildValidator });
  }

  CrossFeildValidator: ValidatorFn = (fg: FormGroup) => {
    var pass = fg.controls['password'].value;
    var confPass = fg.controls['confPassword'].value;
    return pass !== null && confPass !== null && pass === confPass
      ? null
      : { password: "mismatch" };
  };

  get confPassword() {
    console.log(this.sampleForm);
    return this.sampleForm.get('confPassword');
  }
  get name() {
    return this.sampleForm.get('name');
  }
  get email() {
    return this.sampleForm.get('email');
  }
  get password() {
    return this.sampleForm.get('password');
  }
  get mobileNo() {
    return this.sampleForm.get('mobileNo');
  }

  registerWithWithGoogle() {
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      if (userData) {
        this.authService.registerWithGoogle(userData).subscribe(success => {
          this.router.navigate(['/secret-random-number']);
        });
      }
    });
  }

  onSubmit() {
    console.log(this.sampleForm.valid);

    if (this.sampleForm.valid) {
      let userData = {
        "u_email": this.sampleForm.get('email').value,
        "u_name": this.sampleForm.get('name').value,
        "u_password": this.sampleForm.get('password').value
      };
      this.authService.register(userData).subscribe(success => {
        if (success) {
          this.router.navigate(['/secret-random-number']);
        }
      });
    } else {

    }
  }
}
