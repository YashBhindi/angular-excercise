import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentRoutingModule } from './student.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [ListStudentsComponent, StudentDetailsComponent, ChartComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [ListStudentsComponent, StudentDetailsComponent, ChartComponent]
})
export class StudentModule { }
