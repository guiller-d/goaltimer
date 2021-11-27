package com.example.springrest.controller.challenge;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springrest.model.Challenge;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    public Optional <Challenge> findById(Long id);
}