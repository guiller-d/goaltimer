package com.example.springrest.controller.availability;
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
import com.example.springrest.model.Availability;

@RestController
class AvailabilityController {

  private final AvailabilityRepository repository;

  AvailabilityController(AvailabilityRepository repository) {
    this.repository = repository;
  }


  @GetMapping("/availabilities")
  public List<Availability> all() {
    List<Availability> availability = repository.findAll();
    return availability;
  }

  @PostMapping(value = "/addAvailability")
  public String newAvailability(@RequestBody Availability availability) {

    System.out.println(availability);
    repository.save(availability);

    return "new availability successfully added";
  }

  @PostMapping(value = "/updateAvailability")
  public String updateAvailability(@RequestBody Availability availability) {

    System.out.println(availability);
    repository.save(availability);

    return "availability successfully updated";
  }

  @DeleteMapping(value = "/removeavailability")
  public String deleteTime(@RequestBody Availability availability) {
    System.out.println(availability);
    repository.delete(availability);
    return "availability successfully deleted";
  }

}