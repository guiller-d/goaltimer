package com.example.springrest.time;

import java.util.List;
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

import com.example.springrest.model.Time;

@RestController
class TimeController {

  private final TimeRepository repository;

  TimeController(TimeRepository repository) {
    this.repository = repository;
  }
  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/times")
  public List<Time> all() {
    List<Time> users = repository.findAll();
    return users;
  }

  @PostMapping(value = "/addTime")
  public String newTime(@RequestBody Time time) {

    System.out.println(time);
    repository.save(time);

    return "new time stats successfully added";
  }

  @PostMapping(value = "/updateTime")
  public String updateTime(@RequestBody Time time) {

    System.out.println(time);
    repository.save(time);


    return "new time stats successfully added";
  }
  @PostMapping(value = "/removeTime")
  public String deleteTime(@RequestBody Time time) {

    System.out.println(time);
    repository.save(time);

    return "new time stats successfully added";
  }

}