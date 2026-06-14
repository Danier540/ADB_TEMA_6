import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:8090/api/student';

  constructor(private http: HttpClient) {}

  createStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, student);
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search-by-course/${courseId}`);
  }
}
