import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:9090/api/course';

  constructor(private http: HttpClient) {}

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, course);
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getCourseById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/search/${id}`);
}
}
