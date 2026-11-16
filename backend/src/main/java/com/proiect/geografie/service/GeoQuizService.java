package com.proiect.geografie.service;

import com.proiect.geografie.model.GeoQuiz;
import com.proiect.geografie.repository.GeoQuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeoQuizService {

    private final GeoQuizRepository geoQuizRepository;

    public GeoQuizService(GeoQuizRepository geoQuizRepository) {
        this.geoQuizRepository = geoQuizRepository;
    }

    public List<GeoQuiz> getAllQuizzes() {
        return geoQuizRepository.findAll();
    }

    public GeoQuiz saveQuiz(GeoQuiz quiz) {
        return geoQuizRepository.save(quiz);
    }

    public void deleteQuiz(Long id) {
        geoQuizRepository.deleteById(id);
    }
}