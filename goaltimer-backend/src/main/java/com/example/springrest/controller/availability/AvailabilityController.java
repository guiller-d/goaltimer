package com.example.springrest.controller.availability;
import java.util.List;
import org.springframework.util.MultiValueMap;
import org.springframework.http.MediaType;
import com.example.springrest.model.Availability;
import com.example.springrest.model.User;
import java.util.Iterator;
import java.util.List;

import java.util.ArrayList;
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
  public String newAvailability(@RequestBody Availability available) throws Exception {
    checkPath(available);
    return "Added successfully";
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

  /* Add account to cloud for testing */
  @GetMapping("/getAllAvailability")
  public String getAll() throws Exception {
    StringBuffer sb = new StringBuffer();
    List<Availability> available = repository.findAll();
    for (Iterator<Availability> iter = available.iterator(); iter.hasNext();) {
      Availability element = iter.next();
      sb.append(get_data("goaltimer-dbdump/" + element.getHashID() + "/availability/" + element.getFromHour() + element.getFromMin() + element.getToHour() + element.getToMin() + element.getDay() + "_Availability.json"));
    }
    return sb.toString();
  }

    @GetMapping("/getUserAvailability")
  public String getUserAvailability(String email) throws Exception {
    StringBuffer sb = new StringBuffer();
    List<Availability> available = repository.findAll();
    for (Iterator<Availability> iter = available.iterator(); iter.hasNext();) {
      Availability element = iter.next();
        if (email.equals(element.getEmail())){
          sb.append(get_data("goaltimer-dbdump/" + element.getHashID() + "/availability/" + element.getFromHour() + element.getFromMin() + element.getToHour() + element.getToMin() + element.getDay() + "_Availability.json"));
        }
    }
    return sb.toString();
  }



  @SuppressWarnings("unchecked")
  private void writeJSON(Availability newAvailability) throws Exception {
    JSONObject availability_details = new JSONObject();
    JSONObject user_object = new JSONObject();
      availability_details.put("email", newAvailability.getEmail());
      availability_details.put("fromHour", newAvailability.getFromHour());
      availability_details.put("fromMin", newAvailability.getFromMin());
      availability_details.put("fromAmPm", newAvailability.getFromAmPm());
      availability_details.put("hashID", newAvailability.getHashID());
      availability_details.put("day", newAvailability.getDay());
      availability_details.put("toHour", newAvailability.getToHour());
      availability_details.put("toMin", newAvailability.getToMin());
      availability_details.put("toAmPm", newAvailability.getToAmPm());
      availability_details.put("id", newAvailability.getId());
    user_object.put("Available", availability_details);
    String data_loc = "goaltimer-dbdump/" + newAvailability.getHashID() + "/availability/" + newAvailability.getFromHour() + newAvailability.getFromMin() + newAvailability.getToHour() + newAvailability.getToMin() + newAvailability.getDay() + "_Availability.json";
    File availabilityFile = new File(data_loc);
    StringBuffer sb = new StringBuffer();
    if (!availabilityFile.exists()) {
      try (BufferedWriter writer = new BufferedWriter(new FileWriter(availabilityFile))) {
        sb.append(availability_details);
        writer.write(sb.toString());
      }
    }
  }


    private Availability setAvailability(JSONObject jsonObject){
    Availability availability = new Availability();
    String fromHour = jsonObject.get("fromHour").toString();
    String fromMin = jsonObject.get("fromMin").toString();
    String fromAmPm = jsonObject.get("fromAmPm").toString();
    String toHour = jsonObject.get("toHour").toString();
    String toMin = jsonObject.get("toMin").toString();
    String toAmPm = jsonObject.get("toAmPm").toString();
    String day = jsonObject.get("day").toString();
    String Id = jsonObject.get("Id").toString();
    availability.setFromHour(fromHour);
    availability.setFromMin(fromMin);
    availability.setFromAmPm(fromAmPm);
    availability.setToHour(toHour);
    availability.setToMin(toMin);
    availability.setToAmPm(toAmPm);
    availability.setDay(day);
    availability.setId(Long.parseLong(Id));
    return availability;
  }


  @SuppressWarnings("unchecked")
    private void checkPath(Availability newAvailability) throws Exception{
    newAvailability.setHashID(newAvailability.hash(newAvailability.getEmail()));
    try{
        List<Availability> availabilityList = new ArrayList<>();
        availabilityList.add(newAvailability);
        final String JSON_DATA = get_data("goaltimer-dbdump/" + newAvailability.getHashID() +  "/availability/" + newAvailability.getFromHour() + newAvailability.getFromMin() + newAvailability.getToHour() + newAvailability.getToMin() + newAvailability.getDay() + "_Availability.json").toString();
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(JSON_DATA);
        Iterator<JSONObject> iterator = json.values().iterator();
        while (iterator.hasNext()) {
            availabilityList.add(setAvailability(iterator.next()));
         }
         for( Iterator<Availability> iter = availabilityList.iterator(); iter.hasNext();){
            writeJSON(iter.next());
            get_data("goaltimer-dbdump/" + newAvailability.getHashID() + "/availability/" + newAvailability.getFromHour() + newAvailability.getFromMin() + newAvailability.getToHour() + newAvailability.getToMin() + newAvailability.getDay() + "_Availability.json");
         }
    }
    catch (Exception hre) {
      File userDir = new File("goaltimer-dbdump/" + newAvailability.getHashID() + "/availability/");
      if (!userDir.exists()) {
        userDir.mkdirs();
      }
      JSONObject availability_details = new JSONObject();
      JSONObject user_object = new JSONObject();
      availability_details.put("email", newAvailability.getEmail());
      availability_details.put("fromHour", newAvailability.getFromHour());
      availability_details.put("fromMin", newAvailability.getFromMin());
      availability_details.put("fromAmPm", newAvailability.getFromAmPm());
      availability_details.put("hashID", newAvailability.getHashID());
      availability_details.put("day", newAvailability.getDay());
      availability_details.put("toHour", newAvailability.getToHour());
      availability_details.put("toMin", newAvailability.getToMin());
      availability_details.put("toAmPm", newAvailability.getToAmPm());
      availability_details.put("id", newAvailability.getId());
      user_object.put("availability", availability_details);
      String data_loc = "goaltimer-dbdump/" + newAvailability.getHashID() + "/availability/" + newAvailability.getFromHour() + newAvailability.getFromMin() + newAvailability.getToHour() + newAvailability.getToMin() + newAvailability.getDay() + "_Availability.json";
      File AvailabilityFile = new File(data_loc);
      StringBuffer sb = new StringBuffer();
      if (!AvailabilityFile.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(AvailabilityFile))) {
          sb.append(availability_details);
          writer.write(sb.toString());
        }
      }
      repository.save(newAvailability);
      store_data("goaltimer-dbdump/" + newAvailability.getHashID() + "/availability/" + newAvailability.getFromHour() + newAvailability.getFromMin() + newAvailability.getToHour() + newAvailability.getToMin() + newAvailability.getDay() + "_Availability.json");
    }
  }


}