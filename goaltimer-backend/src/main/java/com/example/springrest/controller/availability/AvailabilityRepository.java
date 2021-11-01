package com.example.springrest.controller.availability;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springrest.model.Availability;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    
}