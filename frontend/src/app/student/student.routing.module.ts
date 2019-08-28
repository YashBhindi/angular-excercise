import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { ChartComponent } from './components/chart/chart.component';


const routes: Routes = [
  {
    path: 'list-student',
    component : ListStudentsComponent
  },
  {
    path: 'student-details',
    component : StudentDetailsComponent
  },
  {
    path: 'student-details/:id',
    component : StudentDetailsComponent
  },
  {
    path: 'student-chart',
    component : ChartComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class StudentRoutingModule { }
