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
  private final String bucket_name = "goaltimer-challenges";
  private Storage storage = StorageOptions.getDefaultInstance().getService();
  private Challenge cha;

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

  @PostMapping(value = "updateChallenge")
  public Challenge updateChallenge(@RequestBody Challenge challenge, HttpSession session, User user) {

    return new Challenge();
  }

  //read
  @GetMapping("/challenges/")
  public List<Challenge> all(User user) throws Exception {
    StringBuffer sb = new StringBuffer();
    String hash_id = user.hash(user.getEmail());
    List<Challenge> challenges = repository.findAll();
   
    return challenges;
  }
  // Send data to cloud for testing
  @GetMapping("/sendallchallenges/")
  public String sendAll(User user) throws Exception {
   
    return "Uploaded Successfuly";
  }
}