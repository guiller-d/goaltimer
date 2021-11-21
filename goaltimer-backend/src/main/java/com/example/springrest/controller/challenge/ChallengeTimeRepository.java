
package com.example.springrest.controller.challenge;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.example.springrest.model.ChallengeTime;

public interface ChallengeTimeRepository extends JpaRepository<ChallengeTime, Long> {

}

