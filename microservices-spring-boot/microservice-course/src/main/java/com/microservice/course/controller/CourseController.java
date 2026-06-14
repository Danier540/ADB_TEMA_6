package com.microservice.course.controller;

import com.microservice.course.entities.Course;
import com.microservice.course.service.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    private static final Logger log = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    private ICourseService courseService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveStudent(@RequestBody Course course) {
        log.info("Petición recibida para crear un curso: {}", course.getName());
        courseService.save(course);
        log.info("Curso {} guardado exitosamente", course.getName());
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllStudents() {
        log.info("Petición recibida para listar todos los cursos");
        return ResponseEntity.ok(courseService.findAll());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        log.info("Petición recibida para buscar curso con id {}", id);
        return ResponseEntity.ok(courseService.findById(id));
    }

    @GetMapping("/search/student/{idCourse}")
    public ResponseEntity<?> findStudentByIdCourse(@PathVariable Long idCourse) {
        log.info("Petición recibida para buscar estudiantes del curso con id {}", idCourse);
        return ResponseEntity.ok(courseService.findStudentByIdCourse(idCourse));
    }
}
