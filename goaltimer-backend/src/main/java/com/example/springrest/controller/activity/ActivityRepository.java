package com.example.springrest.controller.activity;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.example.springrest.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

}

