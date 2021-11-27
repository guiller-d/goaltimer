package com.example.springrest.controller.challenge;

import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

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
  private final String bucket_name = "goaltimer-challenges";
  private Storage storage = StorageOptions.getDefaultInstance().getService();

  ChallengeController(ChallengeRepository repository) {
    this.repository = repository;
  }

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
  @PostMapping(value = "/updateChallenge/")
  public String updateChallenge(@RequestBody Challenge newChallenge, HttpSession session) throws Exception {
  

    List<Challenge> challenges = repository.findAll();
    for (Iterator<Challenge> iter = challenges.iterator(); iter.hasNext();) {
      Challenge element = iter.next();
      if (element.getId().equals(newChallenge.getId())){
        System.out.println("element");
        element.setActive(!newChallenge.isActive());
        repository.save(element);
      }
    }
    for (Iterator<Challenge> iter = challenges.iterator(); iter.hasNext();) {
      Challenge element = iter.next();
      if (element.getId().equals(newChallenge.getId())){
        System.out.println("element");
        System.out.println(element.getName());
        System.out.println(element.isActive());

      }
    }


    return "Challenge is updated";
  }

  //read
  @GetMapping("/challenges/")
  public List<Challenge> all(User user) throws Exception {
    List<Challenge> challenges = repository.findAll();
    return challenges;
  }
    /**
   * 
   * @return
   * @throws Exception
   */
  @GetMapping("/dumpchallenges")
  public String dumpchallenges(User user) throws Exception {
    List<Challenge> challenges = repository.findAll();
    for (Iterator<Challenge> iter = challenges.iterator(); iter.hasNext();) {
      Challenge element = iter.next();
      element.setUserHashID(user.hash(user.getEmail()));
      addChallenge(element);
    }
    return "JSON files created for challenges";
  }
    /**
   * 
   * @param newUser
   * @return
   * @throws Exception
   */
  /* Add account to cloud for testing */
  @SuppressWarnings("unchecked")
  private String addChallenge(Challenge challenge) throws Exception {
    File userDir = new File("goaltimer-dbdump/" + challenge.getUserHashID());
    if (!userDir.exists()) {
      userDir.mkdirs();
      JSONObject challenge_details = new JSONObject();
      JSONObject user_object = new JSONObject();
      challenge_details.put("name", challenge.getName());
      challenge_details.put("description", challenge.getdescription());
      challenge_details.put("userHashID", challenge.getUserHashID());
      challenge_details.put("isActive", challenge.isActive());
      challenge_details.put("isComplete", challenge.isComplete());
      user_object.put("user", challenge_details);
      String data_loc = "goaltimer-dbdump/" + challenge.getUserHashID() + "/userinfo.json";
      File user = new File(data_loc);
      StringBuffer sb = new StringBuffer();
      if (!user.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(user))) {
          sb.append(challenge_details);
          writer.write(sb.toString());
        }
      }
    }
    return "User is added to the database";
  }
  
}