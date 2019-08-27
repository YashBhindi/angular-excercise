import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: any;
  imageIcon: any;
  selectedItem = 1;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.imageIcon = this.user.name.charAt(0).toUpperCase();
  }

  toggleactiveMenu(i) {
    this.selectedItem = i;
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToStudent() {
    this.router.navigate(['/list-student']);
  }
}
