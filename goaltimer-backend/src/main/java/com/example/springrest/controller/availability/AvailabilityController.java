package com.example.springrest.controller.availability;
import java.util.List;
import org.springframework.util.MultiValueMap;
import org.springframework.http.MediaType;
import com.example.springrest.model.Availability;
import com.example.springrest.model.User;
import java.util.Iterator;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.Random;

import com.google.cloud.storage.Storage;

import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.ReadChannel;

import java.io.IOException;
import java.io.File;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


@RestController
class AvailabilityController {
  private final String bucket_name = "goaltimer";
  private final AvailabilityRepository repository;
  private static String session_id;
  private Storage storage = StorageOptions.getDefaultInstance().getService();

  private String convertByteArrayToHexString(byte[] arrayBytes) {
    StringBuffer stringBuffer = new StringBuffer();
    for (int i = 0; i < arrayBytes.length; i++) {
      stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16).substring(1));
    }
    return stringBuffer.toString();
  }


  AvailabilityController(AvailabilityRepository repository) {
    this.repository = repository;
  }


  @PostMapping(value = "/addAvailability")
  public String newAvailability(@RequestBody Availability available) {
    available.setHashID(available.getEmail());
    System.out.println(available);
    repository.save(available);

    return "new availablity successfully added";
  }

  /*@PostMapping(value = "/updateAvailability")
  public String updateAvailability(@RequestBody Availability available) {

    System.out.println(available);
    repository.save(available);

    return "available successfully updated";
  }

  @DeleteMapping(value = "/removeavailable")
  public String deleteTime(@RequestBody Availability available) {
    System.out.println(available);
    repository.delete(available);
    return "available successfully deleted";
  }*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    public String create(String data_loc) throws IOException {
    if (storage.get(bucket_name, data_loc) == null) {
      BlobId id = BlobId.of(bucket_name, data_loc);
      BlobInfo info = BlobInfo.newBuilder(id).build();
      storage.create(info);
      return "File uploaded to " + data_loc;
    }
    return "File failed to upload to " + data_loc;
  }
    
    
    public String store_data(String data_loc) throws IOException {
    File file = new File(data_loc);
    if (storage.get(bucket_name, data_loc) == null) {
      BlobId id = BlobId.of(bucket_name, data_loc);
      BlobInfo info = BlobInfo.newBuilder(id).build();
      byte[] arr = Files.readAllBytes(Paths.get(file.toURI()));
      storage.create(info, arr);
      return "File uploaded to " + data_loc;
    }

    return "File failed to upload to " + data_loc;
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
      return sb.toString();
    }
  }

  /* Add account to cloud for testing */
  @GetMapping("/getAllAvailability")
  public String getAll() throws Exception {
    StringBuffer sb = new StringBuffer();
    List<Availability> available = repository.findAll();
    for (Iterator<Availability> iter = available.iterator(); iter.hasNext();) {
      Availability element = iter.next();
      sb.append(get_data("goaltimer-dbdump/" + element.getHashID() + "/AvailabilityInfo.json"));
    }
    return sb.toString();
  }

  /* Add account to cloud for testing */
  @GetMapping("/sendAllAvailability")
  public String sendAll() throws Exception {
    List<Availability> available = repository.findAll();
    for (Iterator<Availability> iter = available.iterator(); iter.hasNext();) {
      Availability element = iter.next();
      store_data("goaltimer-dbdump/" + element.getHashID() + "/AvailabilityInfo.json");
    }
    return "Uploaded Successfuly";
  }

  /* Add availability to cloud for testing */
  @GetMapping("/dumpAvailability")
  public String all() throws Exception {
    List<Availability> available = repository.findAll();
    for (Iterator<Availability> iter = available.iterator(); iter.hasNext();) {
      Availability element = iter.next();
      addAvailability(element);
    }
    return available.toString();
  }

    @SuppressWarnings("unchecked")
  private String addAvailability(Availability newAvailability) throws Exception {
    newAvailability.setHashID(newAvailability.hash(newAvailability.getEmail()));
    File AvailabilityDir = new File("goaltimer-dbdump/" + newAvailability.getHashID());
      AvailabilityDir.mkdirs();
      JSONObject Availability_details = new JSONObject();
      JSONObject Availability_object = new JSONObject();
      Availability_details.put("email", newAvailability.getEmail());
      Availability_details.put("fromHour", newAvailability.getFromHour());
      Availability_details.put("fromMin", newAvailability.getFromMin());
      Availability_details.put("fromAmPm", newAvailability.getFromAmPm());
      Availability_details.put("hashID", newAvailability.getHashID());
      Availability_details.put("day", newAvailability.getDay());
      Availability_details.put("toHour", newAvailability.getToHour());
      Availability_details.put("toMin", newAvailability.getToMin());
      Availability_details.put("toAmPm", newAvailability.getToAmPm());
      Availability_object.put("Available", Availability_details);
      String data_loc = "goaltimer-dbdump/" + newAvailability.getHashID() + "/Availabilityinfo.json";
      File Available = new File(data_loc);
      StringBuffer sb = new StringBuffer();
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(Available))) {
          sb.append(Availability_details);
          writer.write(sb.toString());
    }
    return "Availability is added to the database";
  }

}