package com.proiect.geografie.repository;

import com.proiect.geografie.model.GeoQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeoQuizRepository extends JpaRepository<GeoQuiz, Long> {
}