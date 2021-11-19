package com.example.springrest.controller.activity;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.example.springrest.model.ActivityTime;

public interface ActivityTimeRepository extends JpaRepository<ActivityTime, Long> {

}

