package com.example.springrest.controller.activity;

public class ActivityNotFoundException extends RuntimeException {

    ActivityNotFoundException(Long id) {
      super("Could not find user " + id);
    }
}
