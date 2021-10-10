package com.example.springrest.user;

class UserNotFoundException extends RuntimeException {

    UserNotFoundException(Long id) {
      super("Could not find user " + id);
    }
  }