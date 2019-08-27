import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyAuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBar: boolean;
  constructor(private route: Router, private authService: MyAuthService) { }

  ngOnInit() {
    if (!!this.authService.getJwtToken()) {
      this.route.navigateByUrl('/secret-random-number');
    }
  }

  changeOfRoutes() {
    if (this.route.url === '/' || this.route.url === '/login') {
      this.showBar = false;
    } else {
      this.showBar = true;
    }
  }
}
