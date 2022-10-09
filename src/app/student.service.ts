import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8086/api/v1';

  constructor(private http: HttpClient) { }

  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/studentById/${id}`);
  }

  addStudent(student: Object): Observable<Object> {
    console.log("Add url invoked====>")
    return this.http.post(`${this.baseUrl}/addstudent`, student);
  }

  updateStudent(id: number, student: Object): Observable<Object> {
    // console.log("studentData++===>",student);
    // const uploadImageData = new FormData();
    // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    return this.http.put(`${this.baseUrl}/update`, student);
  }
 
/*
  updateImage(id: number, file: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateImage`, file);
  }
*/

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getStudentList(): Observable<any> {
    console.log("List url invoked====>")
    return this.http.get(`${this.baseUrl}/students`);
  }

}
