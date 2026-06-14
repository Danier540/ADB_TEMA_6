import { Component } from '@angular/core';
import { CourseService } from '../../services/course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.css']
})
export class CourseFormComponent {
  course = { name: '', teacher: '' };
  courses: any[] = [];
  searchCourseId: number = 0;
  notFound: boolean = false; 

  constructor(private courseService: CourseService) {}

  createCourse() {
    this.courseService.createCourse(this.course).subscribe({
      next: res => {
        console.log('Curso creado:', res);
        alert('Curso registrado correctamente');
        this.course = { name: '', teacher: '' };
        if (this.searchCourseId > 0) {
          this.loadCourseById(this.searchCourseId);
        }
      },
      error: err => {
        console.error('Error al crear curso:', err);
        alert('Error al registrar curso');
      }
    });
  }

  loadCourseById(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: res => {
        if (res) {
          this.courses = [res];
          this.notFound = false;
        } else {
          this.courses = [];
          this.notFound = true;
        }
      },
      error: err => {
        console.error('Error al obtener curso por ID:', err);
        this.courses = [];
        this.notFound = true;
      }
    });
  }
}
