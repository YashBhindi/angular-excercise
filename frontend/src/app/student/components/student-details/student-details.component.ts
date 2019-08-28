import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  pageTitle: string;
  private student;
  num: number;

  editFlag: boolean = false;
  studentForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      email : ['' , Validators.required]
    });
  }

  setFormValue(student) {
    this.studentForm.setValue({
      firstname: student.s_firstname,
      lastname: student.s_lastname,
      age: student.s_age,
      email: student.s_email
    });
  }


  ngOnInit() {
    this.num = parseInt(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.num)) {
      this.pageTitle = 'Update Student';
      this.loadData();
      this.editFlag = true;
    } else {
      this.pageTitle = 'Add Student';
      this.editFlag = false;
    }
  }

  loadData() {
    this.studentService.getStudentDetails(this.num).subscribe(
      (data) => {
        if (data) {
          this.student =  data['student'];
          console.log(this.student);
          
          this.setFormValue(this.student);
        }
      }
    );
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (this.editFlag) {
        this.studentService.updateStudent(this.num, this.studentForm.getRawValue()).subscribe(success => {
          this.router.navigate(['student/list-student']);
        }, error => {
          console.log(error);
        });
      } else {
        this.studentService.addStudent(this.studentForm.getRawValue()).subscribe(success => {
          this.router.navigate(['student/list-student']);
        }, error => {
          console.log(error);
        });
      }
    } else {
      console.log('Invalid form');
    }
  }
}
