import { Component } from '@angular/core';
import { CourseFormComponent } from './components/course-form/course-form';
import { StudentFormComponent } from './components/student-form/student-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CourseFormComponent, StudentFormComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
