package com.example.springrest.Database;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.springrest.model.User;
import com.example.springrest.controller.activity.ActivityRepository;
import com.example.springrest.controller.challenge.ChallengeRepository;
import com.example.springrest.controller.time.TimeRepository;
import com.example.springrest.controller.user.UserRepository;
import com.example.springrest.controller.availability.AvailabilityRepository;
import com.example.springrest.model.Activity;
import com.example.springrest.model.Challenge;
import com.example.springrest.model.Time;
import com.example.springrest.model.Availability;
@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(ChallengeRepository challengeRepository, UserRepository userRepository, TimeRepository waterRepository, ActivityRepository acitivityRepository, AvailabilityRepository availabilityRepository) {

    return args -> {
      
      log.info("Preloading " + challengeRepository.save(new Challenge("5 Day Challenge" ,"Do an activity for 5 days.", false , false)));
      log.info("Preloading " + challengeRepository.save(new Challenge("10 Day Challenge" ,"Do an activity for 10 days.", false , false)));
      log.info("Preloading " + challengeRepository.save(new Challenge("15 Day Challenge" ,"Do an activity for 15 days.", false , false)));
      log.info("Preloading " + challengeRepository.save(new Challenge("20 Day Challenge" ,"Do an activity for 20 days.",  false , false)));
      log.info("Preloading " + challengeRepository.save(new Challenge("25 Day Challenge" ,"Do an activity for 25 days.",  false , false)));
      log.info("Preloading " + challengeRepository.save(new Challenge("30 Day Challenge" ,"Do an activity for 30 days.",  false , false)));
      log.info("Preloading " + challengeRepository.save(new Challenge("35 Day Challenge" ,"Do an activity for 35 days.",  false , false)));

      log.info("Preloading " + userRepository.save(new User("Marti" ,"Tengdin", "Marti.Tengdin@gmail.com", "password")));
      log.info("Preloading " + userRepository.save(new User("Allis", "Wyn", "Allis.Wyn@gmail.com", "password")));
      log.info("Preloading " + userRepository.save(new User("Alexine" ,"Lilas", "Alexine.Lilas@gmail.com", "password")));
      log.info("Preloading " + userRepository.save(new User("Genevra", "Sperling", "Genevra.Sperling@gmail.com", "password")));
      log.info("Preloading " + userRepository.save(new User("Bilbo" ,"Baggins", "bilbobaggins@gmail.com", "password")));
      log.info("Preloading " + userRepository.save(new User("Frodo", "Baggins", "frodobaggins@gmail.com", "password")));

      log.info("Preloading " + waterRepository.save(new Time(7, "67", "10/21/2021")));
      log.info("Preloading " + waterRepository.save(new Time(7, "77", "10/22/2021")));
      log.info("Preloading " + waterRepository.save(new Time(7, "87", "10/23/2021")));
      log.info("Preloading " + waterRepository.save(new Time(7, "97", "10/24/2021")));
      log.info("Preloading " + waterRepository.save(new Time(7, "107", "10/25/2021")));

      log.info("Preloading " + waterRepository.save(new Time(8, "66", "10/21/2021")));
      log.info("Preloading " + waterRepository.save(new Time(8, "76", "10/22/2021")));
      log.info("Preloading " + waterRepository.save(new Time(8, "86", "10/23/2021")));
      log.info("Preloading " + waterRepository.save(new Time(8, "96", "10/24/2021")));
      log.info("Preloading " + waterRepository.save(new Time(8, "106", "10/25/2021")));

      log.info("Preloading " + waterRepository.save(new Time(9, "65", "10/21/2021")));
      log.info("Preloading " + waterRepository.save(new Time(9, "75", "10/22/2021")));
      log.info("Preloading " + waterRepository.save(new Time(9, "85", "10/23/2021")));
      log.info("Preloading " + waterRepository.save(new Time(9, "95", "10/24/2021")));
      log.info("Preloading " + waterRepository.save(new Time(9, "105", "10/25/2021")));

      log.info("Preloading " + acitivityRepository.save(new Activity("Meditation" ,true, "daily", "30")));
      log.info("Preloading " + acitivityRepository.save(new Activity("Aerobic Exercise" ,true, "weekly", "30")));
      log.info("Preloading " + acitivityRepository.save(new Activity("Meditation" ,true, "daily","30" )));
      log.info("Preloading " + acitivityRepository.save(new Activity("Movie Night" ,true, "weekly", "30")));
      log.info("Preloading " + acitivityRepository.save(new Activity("Cooking" ,true, "daily", "30" )));
      log.info("Preloading " + acitivityRepository.save(new Activity("Reading" ,true, "Daily","30")));

      // log.info("Preloading " + availabilityRepository.save(new Availability("1","15","am","9","15","pm", "monday", "ahmad.abuzaina@sjsu.edu")));

    };
  }
}