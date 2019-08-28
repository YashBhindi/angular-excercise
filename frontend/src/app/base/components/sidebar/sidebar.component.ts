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
  }

  toggleactiveMenu(i) {
    this.selectedItem = i;
  }

  navigateToStudent() {
    this.router.navigate(['/student/list-student']);
  }
  navigateToStudentChart() {

  }
}
