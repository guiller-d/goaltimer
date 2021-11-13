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

    System.out.println(available);
    repository.save(available);

    return "new available successfully added";
  }

  @PostMapping(value = "/updateAvailability")
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
  }
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

  /* Add account to cloud for testing */
  @GetMapping("/dumpAvailability")
  public String all() throws Exception {
    List<Availability> available = repository.findAll();
    StringBuffer sb = new StringBuffer();
    StringBuffer sb_out = new StringBuffer();
    for (Iterator<Availability> iter = available.iterator(); iter.hasNext();) {
      Availability element = iter.next();
      File availableDir = new File("goaltimer-dbdump/" + element.getHashID());
      if (!availableDir.exists()) {
        availableDir.mkdirs();
        File file = new File("goaltimer-dbdump/" + element.getHashID() + "/AvailabilityInfo.json");
        if (!file.exists()) {
          try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            sb.append(element);
            writer.write(sb.toString());
            writer.flush();
            writer.close();
          }
        }
      }
    }
    return sb_out.toString();
  }

}