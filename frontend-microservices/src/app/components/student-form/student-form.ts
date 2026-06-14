import { Component } from '@angular/core';
import { StudentService } from '../../services/student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentFormComponent {
  student = { name: '', lastName: '', email: '', courseId: 0 };
  students: any[] = [];
  searchCourseId: number = 0;
  notFound: boolean = false; 

  constructor(private studentService: StudentService) {}

  createStudent() {
    this.studentService.createStudent(this.student).subscribe({
      next: res => {
        console.log('Estudiante creado:', res);
        alert('Estudiante registrado correctamente');
        this.student = { name: '', lastName: '', email: '', courseId: 0 };
        if (this.searchCourseId > 0) {
          this.loadStudents(this.searchCourseId);
        }
      },
      error: err => {
        console.error('Error al crear estudiante:', err);
        alert('Error al registrar estudiante');
      }
    });
  }

  loadStudents(courseId: number) {
    this.studentService.getStudentsByCourse(courseId).subscribe({
      next: res => {
        if (res && res.length > 0) {
          this.students = res;
          this.notFound = false;
        } else {
          this.students = [];
          this.notFound = true;
        }
      },
      error: err => {
        console.error('Error al obtener estudiantes:', err);
        this.students = [];
        this.notFound = true;
      }
    });
  }
}
