package com.microservice.course.service;

import com.microservice.course.client.StudentClient;
import com.microservice.course.dto.StudentDTO;
import com.microservice.course.entities.Course;
import com.microservice.course.http.response.StudentByCourseResponse;
import com.microservice.course.persistence.ICourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements ICourseService {

    private static final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

    @Autowired
    private ICourseRepository courseRepository;

    @Autowired
    private StudentClient studentClient;

    @Override
    public List<Course> findAll() {
        log.info("Consultando todos los cursos");
        List<Course> courses = (List<Course>) courseRepository.findAll();
        log.info("Se recuperaron {} cursos", courses.size());
        return courses;
    }

    @Override
    public Course findById(Long id) {
        log.info("Buscando curso con id {}", id);
        return courseRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Curso con id {} no encontrado", id);
                    return new RuntimeException("Curso no encontrado");
                });
    }

    @Override
    public void save(Course course) {
        log.info("Guardando curso: {}", course.getName());
        courseRepository.save(course);
        log.info("Curso {} guardado exitosamente", course.getName());
    }

    @Override
    public StudentByCourseResponse findStudentByIdCourse(Long idCourse) {
        log.info("Buscando estudiantes para el curso con id {}", idCourse);

        // Consultar el curso
        Optional<Course> courseOpt = courseRepository.findById(idCourse);
        if (courseOpt.isEmpty()) {
            log.warn("Curso con id {} no encontrado", idCourse);
            return new StudentByCourseResponse();
        }

        Course course = courseOpt.get();
        log.debug("Curso encontrado: {} - Profesor: {}", course.getName(), course.getTeacher());

        // Obtener los estudiantes
        List<StudentDTO> studentDTOList = studentClient.findAllStudentsByCourse(idCourse);
        log.info("Se recuperaron {} estudiantes para el curso {}", studentDTOList.size(), course.getName());

        return StudentByCourseResponse.builder()
                .courseName(course.getName())
                .teacher(course.getTeacher())
                .studentDTOList(studentDTOList)
                .build();
    }
}
