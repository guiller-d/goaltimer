package com.example.springrest.controller.activity;

import java.util.Iterator;
import java.util.List;
import java.io.IOException;
import java.io.File;
import java.io.BufferedWriter;
import java.io.FileWriter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.springrest.model.Activity;
import java.nio.ByteBuffer;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.ReadChannel;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.simple.JSONObject;

@RestController
public class ActivityController {
  @Autowired
  private Storage storage = StorageOptions.getDefaultInstance().getService();

  private final ActivityRepository repository;
  private final String bucket_name = "goaltimer";

  ActivityController(ActivityRepository repository) {
    this.repository = repository;
  }

  /**
   * 
   * @param data_loc
   * @return
   * @throws Exception
   */
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

  /**
   * 
   * @param data_loc
   * @return
   * @throws IOException
   */
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

  @GetMapping("/sendallactivities")
  public String sendAll() throws Exception {
    List<Activity> activities = repository.findAll();
    for (Iterator<Activity> iter = activities.iterator(); iter.hasNext();) {
      Activity element = iter.next();
      store_data("goaltimer-dbdump/" + element.getUserHashId() + "/activities/useractivities.json");
    }
    return "Uploaded Successfuly";
  }

  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/dumpactivities")
  public List<Activity> all() throws Exception {
    List<Activity> activities = repository.findAll();
    for (Iterator<Activity> iter = activities.iterator(); iter.hasNext();) {
      Activity element = iter.next();
      addActivity(element);
    }
    return activities;
  }

  @SuppressWarnings("unchecked")
  private String addActivity(Activity newActivity) throws Exception {

    System.out.println(newActivity);
    System.out.println("Activity esting");

    System.out.println(newActivity.getUserHashId());
    System.out.println(newActivity.getActivityName());
    System.out.println(newActivity.getTime());
    System.out.println(newActivity.getSchedule());
    System.out.println(newActivity.getStatus());

    File userDir = new File("goaltimer-dbdump/" + newActivity.getUserHashId() + "/activities/");
    if (!userDir.exists()) {
      userDir.mkdirs();
    } else {
      JSONObject activity_details = new JSONObject();
      JSONObject user_object = new JSONObject();
      activity_details.put("activityName", newActivity.getActivityName());
      activity_details.put("status", newActivity.getStatus());
      activity_details.put("user_hash_id", newActivity.getUserHashId());
      activity_details.put("id", newActivity.getID());
      activity_details.put("time", newActivity.getTime());
      activity_details.put("schedule", newActivity.getSchedule());
      user_object.put("activities", activity_details);
      String data_loc = "goaltimer-dbdump/" + newActivity.getUserHashId() + "/activities/useractivities.json";
      File activityFile = new File(data_loc);
      StringBuffer sb = new StringBuffer();
      if (!activityFile.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(activityFile))) {
          sb.append(activity_details);
          writer.write(sb.toString());
        }
      }
    }
    return "User is added to the database";
  }

  @PostMapping(value = "/addActivity/")
  public Activity addEmployee(@RequestBody Activity newActivity) throws Exception {
    Activity activity = new Activity();
    addActivity(newActivity);
    repository.save(newActivity);
    return activity;
  }

}
