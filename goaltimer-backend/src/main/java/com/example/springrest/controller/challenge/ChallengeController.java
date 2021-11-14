package com.example.springrest.controller.challenge;

import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpSession;
import java.util.Iterator;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.example.springrest.model.Challenge;

@RestController
class ChallengeController {

  private final ChallengeRepository repository;

  ChallengeController(ChallengeRepository repository) {
    this.repository = repository;
  }
  // Aggregate root
  // tag::get-aggregate-root[]
  //read
  @GetMapping("/challenges")
  public List<Challenge> all() {
    List<Challenge> challenges = repository.findAll();
    return challenges;
  }
  //update
  @PostMapping(value = "/updateChallenge/")
  public Challenge updateChallenge(@RequestBody Challenge challenge, HttpSession session) {

    return null;
  }

}