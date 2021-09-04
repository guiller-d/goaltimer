package com.example.springrest.challenge;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springrest.model.Challenge;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    public List<Challenge> findByName(String name);


    
}