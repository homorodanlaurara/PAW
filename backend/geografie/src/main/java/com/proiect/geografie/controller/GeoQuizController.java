package com.proiect.geografie.controller;

import com.proiect.geografie.model.GeoQuiz;
import com.proiect.geografie.service.GeoQuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class GeoQuizController {

    private final GeoQuizService geoQuizService;

    public GeoQuizController(GeoQuizService geoQuizService) {
        this.geoQuizService = geoQuizService;
    }

    @GetMapping
    public List<GeoQuiz> getAllQuizzes() {
        return geoQuizService.getAllQuizzes();
    }

    @PostMapping
    public GeoQuiz createQuiz(@RequestBody GeoQuiz quiz) {
        return geoQuizService.saveQuiz(quiz);
    }

    @DeleteMapping("/{id}")
    public void deleteQuiz(@PathVariable Long id) {
        geoQuizService.deleteQuiz(id);
    }
}