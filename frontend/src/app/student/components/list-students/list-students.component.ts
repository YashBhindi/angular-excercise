import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  students = [];
  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.studentService.getAllStudents().subscribe(
      data => {
        if (data) {
          console.log(data);
          this.students = data['student'];
        }
      }
    );
  }

  getStudentDetails(student) {
    this.router.navigate(['/student/student-details', student.s_id]);
  }

  // deleteStudent($event, item) {
  //   $event.stopPropagation();
  //   document.getElementById("openModalButton").click();
  //   this.itemListServicesService.deleteItem(item);
  // }

  updateStudent($event, student) {
    $event.stopPropagation();
    this.router.navigate(['/student/student-details', student.s_id]);
  }

}
