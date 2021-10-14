package com.example.springrest.controller.user;

class UserNotFoundException extends RuntimeException {

    UserNotFoundException(Long id) {
      super("Could not find user " + id);
    }
  }