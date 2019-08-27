import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyAuthService} from './../../../auth/services/auth.service';
@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {

  constructor(private authenticationService: MyAuthService, private route: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      localStorage.clear();
      this.route.navigateByUrl('/');
    });
  }
}
