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
  @GetMapping("/challenges")
  public List<Challenge> all() {
    StringBuffer sb = new StringBuffer();
    List<Challenge> challenges = repository.findAll();
    for (Iterator<Challenge> iter = challenges.iterator(); iter.hasNext();) {
      Challenge new_challenge = iter.next();
      sb.append(get_data("goaltimer-dbdump/" + new_challenge.getHashID() + "/challengeinfo.json"));
    }
    return sb.toString();
  }
  //update
  @PostMapping(value = "/updateChallenge/")
  public Challenge updateChallenge(@RequestBody Challenge challenge, HttpSession session) {

    return null;
  }

}