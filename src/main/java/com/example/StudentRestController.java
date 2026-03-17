package com.example;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentRestController {

    private final StudentRepository repo;

    public StudentRestController(StudentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return repo.save(student);
    }

    // ✅ FIXED (no duplicate /students)
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Student student = repo.findById(id).orElseThrow();

        student.setName(updatedStudent.getName());
        student.setAge(updatedStudent.getAge());

        return repo.save(student);
    }

    // ✅ FIXED
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        repo.deleteById(id);
    }
}