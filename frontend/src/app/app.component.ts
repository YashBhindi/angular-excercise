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
      
    }
  }

  changeOfRoutes() {
    if (!!this.authService.getJwtToken()) {
      this.showBar = true;
    } else {
      this.showBar = false;
    }
  }
}
