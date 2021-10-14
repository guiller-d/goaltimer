package com.example.springrest.controller.time;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springrest.model.Time;

public interface TimeRepository extends JpaRepository<Time, Long> {

    
}