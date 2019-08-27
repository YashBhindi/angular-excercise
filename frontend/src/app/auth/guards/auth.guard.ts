import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MyAuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: MyAuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/secret-random-number']);
    }
    return !this.authService.isLoggedIn();
  }
}
