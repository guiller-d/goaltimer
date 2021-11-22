package com.example.springrest.controller.challenge;

import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;

import com.example.springrest.model.Challenge;
import com.example.springrest.model.ChallengeTime;
import com.example.springrest.model.User;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.ReadChannel;
import org.json.simple.JSONObject;

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

import java.io.IOException;
import java.io.File;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

import com.example.springrest.model.Challenge;

@RestController
class ChallengeController {

  private final ChallengeRepository repository;
  private static String session_id;
  private final ChallengeTimeRepository repository_time;
  private final String bucket_name = "goaltimer-challenges";
  private Storage storage = StorageOptions.getDefaultInstance().getService();
  private Challenge cha;

  ChallengeController(ChallengeRepository repository, ChallengeTimeRepository repository_time) {
    this.repository = repository;
    this.repository_time = repository_time;
  }
  // Aggregate root
  // tag::get-aggregate-root[]

  public String get_data(String data_loc) throws Exception {
    StringBuffer sb = new StringBuffer();
    try (ReadChannel channel = storage.reader(bucket_name, data_loc)) {
      ByteBuffer bytes = ByteBuffer.allocate(64 * 1024);
      while (channel.read(bytes) > 0) {
        bytes.flip();
        String data = new String(bytes.array(), 0, bytes.limit());
        sb.append(data);
        bytes.clear();
      }
      System.out.println(sb.toString());
    }
    return sb.toString();
  }

  public String store_data(String data_loc) throws IOException {
    File file = new File(data_loc);
    if (storage.get(bucket_name, data_loc) == null) {
      BlobId blob_id = BlobId.of(bucket_name, data_loc);
      BlobInfo info = BlobInfo.newBuilder(blob_id).build();
      byte[] arr = Files.readAllBytes(Paths.get(file.toURI()));
      storage.create(info, arr);
      return "File uploaded to " + data_loc;
    }
    return "File failed to upload to " + data_loc;
  }

  //read
  @GetMapping("/challenges/")
  public List<Challenge> all(User user) throws Exception {
    StringBuffer sb = new StringBuffer();
    String hash_id = user.hash(user.getEmail());
    List<Challenge> challenges = repository.findAll();
    for (Iterator<Challenge> iter = challenges.iterator(); iter.hasNext();) {
      Challenge new_challenge = iter.next();
      if (hash_id.equals(new_challenge.getUserHashID())) {
        String data_loc = "goaltimer-dbdump/" + new_challenge.getUserHashID() + "/challenges/" + new_challenge.getName() + "_info.json";
        File challengeFile = new File(data_loc);
        // StringBuffer sb = new StringBuffer();
        if (!challengeFile.exists()) {
          try (BufferedWriter writer = new BufferedWriter(new FileWriter(challengeFile))) {
            get_data(data_loc);
            writer.write(sb.toString());
          }
        }
        get_data(data_loc);
      }
    }
    return challenges;
  }
  /* Send data to cloud for testing */
  @GetMapping("/sendallchallenges/")
  public String sendAll(User user) throws Exception {
    List<Challenge> challenges = repository.findAll();
    String hash_id = user.hash(user.getEmail());
    // List<JSONObject> challengesList = new ArrayList<>();
    for (Iterator<Challenge> iter = challenges.iterator(); iter.hasNext();) {
      Challenge new_challenge = iter.next();
      String data_loc = "goaltimer-dbdump/" + new_challenge.getUserHashID() + "/challenges/" + new_challenge.getName() + "_info.json";
      // idea: make JSON object with 'new_challenge' data, store it to 'data_loc'
      if (hash_id.equals(new_challenge.getUserHashID())) {
        JSONObject challenge_details = new JSONObject();
        challenge_details.put("id", new_challenge.getId());
        challenge_details.put("name", new_challenge.getName());
        challenge_details.put("description", new_challenge.getdescription());
        challenge_details.put("time", new_challenge.getTime());
        challenge_details.put("isActive", new_challenge.isActive());
        challenge_details.put("isComplete", new_challenge.isComplete());
        File challengeFile = new File(data_loc);
        StringBuffer sb = new StringBuffer();
        if (!challengeFile.exists()) {
          try (BufferedWriter writer = new BufferedWriter(new FileWriter(challengeFile))) {
            store_data(data_loc);
            writer.write(sb.toString());
          }
        }
        store_data(data_loc);
      }
      // challengesList.add(challenge_details);
    }
    return "Uploaded Successfuly";
  }
  //update
  @PostMapping(value = "/updateChallenge/")
  public Challenge updateChallenge(@RequestBody Challenge challenge, HttpSession session) {
    String challengeName = challenge.getName();
    boolean active = challenge.isActive();
    int time = challenge.getTime();
    boolean complete = challenge.isComplete();
    Challenge original = (Challenge) session.getAttribute(session_id);
    List<Challenge> challenges = repository.findByName(challengeName);
    for (Iterator<Challenge> iter = challenges.iterator(); iter.hasNext();) {
      Challenge new_challenge = iter.next();
      if (challenge.getName().equals(original.getName())) {
        new_challenge.setActive(active);
        new_challenge.setComplete(complete);
        new_challenge.setTime(time);
        repository.save(new_challenge);
        return challenge;
      }
    }
    return challenge;
    /*
    challenge.setActive(true);
    challenge.setComplete(false);
    -- CODE --
    LocalDateTime start = LocalDateTime.now();
    while (true) {
      // logic
      if (ChronoUnit.SECONDS.between(start, LocalDateTime.now()) >= 20) break;
    }
    System.out.println("out of the loop");
    challenge.setComplete(true);
    challenge.setActive(false);
    return challenge;
    */
  }
}