import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _url: string = `${config.apiUrl}/student`;
  constructor(private http: HttpClient) { }

  getStudentDetails(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this._url}/studentById?id=${studentId}`);
  }

  addStudent(studentData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = `${this._url}/add-student`;
    return this.http.post<any>(url, studentData, { headers: headers });
  }

  updateStudent(studentId: number, data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = `${this._url}/student-update?id=${studentId}`;
    return this.http.put<any>(url, data, { headers: headers });
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<any[]>(`${this._url}/students`);
  }

  deleteStudent(studentId: number) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let url = `${this._url}/student-detele?id=${studentId}`;
    return this.http
      .delete(url, { headers: headers });
  }
}
