import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyAuthService } from './../../../auth/services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {

  isLoggedIn: Observable<boolean>;

  constructor(private authenticationService: MyAuthService, private route: Router) {

    this.isLoggedIn = authenticationService.isUserLoggedIn();

  }


  ngOnInit() {
  }

  login() {
    this.route.navigateByUrl('/login');
  }

  register() {
    this.route.navigateByUrl('/register');

  }
  logout() {
    this.authenticationService.logout().subscribe(() => {
      localStorage.clear();
      this.route.navigateByUrl('/');
    });
  }
}
