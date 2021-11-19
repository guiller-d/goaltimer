package com.example.springrest.controller.activity;

import java.util.ArrayList;
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
import com.example.springrest.model.ActivityTime;
import com.example.springrest.model.User;

import java.nio.ByteBuffer;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.ReadChannel;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@RestController
public class ActivityController {
  @Autowired
  private Storage storage = StorageOptions.getDefaultInstance().getService();

  private final ActivityRepository repository;
  private final ActivityTimeRepository repository_time;
  private final String bucket_name = "goaltimer";

  ActivityController(ActivityRepository repository, ActivityTimeRepository repository_time) {
    this.repository = repository;
    this.repository_time = repository_time;
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
  @PostMapping(value = "/addActivity/")
  public Activity addEmployee(@RequestBody Activity newActivity) throws Exception {
    Activity activity = new Activity();
    checkPath(newActivity);
    //addActivity(newActivity);
    return activity;
  }
  /**
   * 
   * @return
   * @throws Exception
   */
  @SuppressWarnings("unchecked")
  @PostMapping(value = "/getallactivities")
  public List<JSONObject> getAll(@RequestBody User user) throws Exception {
    StringBuffer sb = new StringBuffer();
    String hash_id = user.hash(user.getEmail());
    List<Activity> activities = repository.findAll();
    List<JSONObject> activitiesList = new ArrayList<>();
    for (Iterator<Activity> iter = activities.iterator(); iter.hasNext();) {
      Activity element = iter.next();
      if (hash_id.equals(element.getUserHashId())){
        JSONObject activity_details = new JSONObject();
        activity_details.put("activityName", element.getActivityName());
        activity_details.put("status", element.getStatus());
        activity_details.put("hash", element.getUserHashId());
        activity_details.put("id", element.getID());
        activity_details.put("time", element.getTime());
        activity_details.put("schedule", element.getSchedule());
        activitiesList.add(activity_details);
      }
    }
    return activitiesList;
  }

  @PostMapping(value = "/getActivityTimeCount")
  public String getActivityTimeCount(@RequestBody User user) throws Exception {
    int count = 0;
    String hash_id = user.hash(user.getEmail());
    List<ActivityTime> activityTimeList = repository_time.findAll();
    for (Iterator<ActivityTime> iter = activityTimeList.iterator(); iter.hasNext();) {
      ActivityTime element = iter.next();
      if (hash_id.equals(element.getUserHashID())){
        count++;
      }
    }
    return String.valueOf(count);
  }
 

  @PostMapping(value = "/addTime/")
  public ActivityTime addTime(@RequestBody ActivityTime newActivityTime) throws Exception {
    System.out.println(newActivityTime.getActivityName());
    System.out.println(newActivityTime.getUserHashID());
    checkPathActivityTime(newActivityTime);
    return newActivityTime;
  }
  @SuppressWarnings("unchecked")
  @PostMapping(value = "/getAllActivityTime")
  public List<JSONObject> getAllActivityTime(@RequestBody User user) throws Exception {
    StringBuffer sb = new StringBuffer();
    System.out.println("Aloha");
    String hash_id = user.hash(user.getEmail());
    List<ActivityTime> activityTimes = repository_time.findAll();
    List<JSONObject> activityTimeList = new ArrayList<>();
    for (Iterator<ActivityTime> iter = activityTimes.iterator(); iter.hasNext();) {
      ActivityTime element = iter.next();
      if (hash_id.equals(element.getUserHashID())){
        JSONObject activity_details = new JSONObject();
        activity_details.put("activityName", element.getActivityName());
        activity_details.put("time", element.getTime());
        activity_details.put("date", element.getDate());
        activity_details.put("userHashID", element.getUserHashID());
        activity_details.put("id", element.getId());
        activityTimeList.add(activity_details);
      }
    }
    return activityTimeList;
  }
  @SuppressWarnings("unchecked")
  private void writeActivityTimeJSON(ActivityTime activityTime) throws Exception {
    JSONObject activityTime_details = new JSONObject();
    JSONObject user_object = new JSONObject();
    activityTime_details.put("activityName", activityTime.getActivityName());
    activityTime_details.put("time", activityTime.getTime());
    activityTime_details.put("date", activityTime.getDate());
    activityTime_details.put("userHashID", activityTime.getUserHashID());
    activityTime_details.put("id", activityTime.getId());
    user_object.put("activityTime", activityTime_details);
    String data_loc = "goaltimer-dbdump/" + activityTime.getUserHashID() + "/activities/" + activityTime.getActivityName() + "_" + activityTime.getUserHashID() + "/" + activityTime.getActivityName() + "_Time.json";
    File activityFile = new File(data_loc);
    StringBuffer sb = new StringBuffer();
    if (!activityFile.exists()) {
      try (BufferedWriter writer = new BufferedWriter(new FileWriter(activityFile))) {
        sb.append(activityTime_details);
        writer.write(sb.toString());
      }
    }
  }

  private ActivityTime setActivityTime(JSONObject jsonObject){
    ActivityTime activityTime = new ActivityTime();
    String activityName = jsonObject.get("activityName").toString();
    String time = jsonObject.get("time").toString();
    String date = jsonObject.get("date").toString();
    String userHashID = jsonObject.get("userHashID").toString();
    String id = jsonObject.get("id").toString();
    activityTime.setActivityName(activityName);
    activityTime.setTime(time);
    activityTime.setDate(date);
    activityTime.setUserHashID(userHashID);
    activityTime.setId(Long.parseLong(id));
    return activityTime;
  }
  @SuppressWarnings("unchecked")
  private void checkPathActivityTime(ActivityTime newActivityTime) throws Exception{
    String user_hash_id = newActivityTime.getUserHashID();
    String activityName = newActivityTime.getActivityName();
    try{
        List<ActivityTime> activityTimeList = new ArrayList<>();
        activityTimeList.add(newActivityTime);
        final String JSON_DATA = get_data("goaltimer-dbdump/" + user_hash_id +  "/activities/" + activityName + "_" + user_hash_id + "/" + activityName +  "_Time.json").toString();
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(JSON_DATA);
        Iterator<JSONObject> iterator = json.values().iterator();
        while (iterator.hasNext()) {
          activityTimeList.add(setActivityTime(iterator.next()));
         }
         for( Iterator<ActivityTime> iter = activityTimeList.iterator(); iter.hasNext();){
            writeActivityTimeJSON(iter.next());
            get_data("goaltimer-dbdump/" + user_hash_id +  "/activities/" + activityName + "_" + user_hash_id + "/"+ activityName  +  "_Time.json");
         }
    }
    catch (Exception hre) {
      File userDir = new File("goaltimer-dbdump/" + user_hash_id + "/activities/" + activityName + "_" + user_hash_id + "/");
      if (!userDir.exists()) {
        userDir.mkdirs();
      }
      JSONObject activityTime_details = new JSONObject();
      JSONObject user_object = new JSONObject();
      activityTime_details.put("activityName", activityName);
      activityTime_details.put("time", newActivityTime.getTime());
      activityTime_details.put("date", newActivityTime.getDate());
      activityTime_details.put("userHashID", user_hash_id);
      activityTime_details.put("id", newActivityTime.getId());
      user_object.put("activityTime", activityTime_details);

      String data_loc = "goaltimer-dbdump/" + user_hash_id +  "/activities/" + activityName + "_" + user_hash_id + "/" + activityName +  "_Time.json";
      File activityFile = new File(data_loc);
      StringBuffer sb = new StringBuffer();
      if (!activityFile.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(activityFile))) {
          sb.append(activityTime_details);
          writer.write(sb.toString());
        }
      }
      repository_time.save(newActivityTime);
      store_data("goaltimer-dbdump/" + user_hash_id + "/activities/" + activityName + "_" + user_hash_id + "/" + activityName +  "_Time.json");
    }
  }

  private Activity setActivity(JSONObject jsonObject){
    Activity activity = new Activity();
    String activityHashID = jsonObject.get("activityHashID").toString();
    String schedule = jsonObject.get("schedule").toString();
    String activity_name = jsonObject.get("activityName").toString();
    String time = jsonObject.get("time").toString();
    String hashID = jsonObject.get("hash").toString();
    String status = jsonObject.get("status").toString();
    activity.setActivityHashID(activityHashID);
    activity.setSchedule(schedule);
    activity.setActivityName(activity_name);
    activity.setTime(time);
    activity.setUserHashId(hashID);
    activity.setStatus(Boolean.valueOf(status));
    return activity;
  }
  @SuppressWarnings("unchecked")
  private void writeJSON(Activity activity) throws Exception {
    JSONObject activity_details = new JSONObject();
    JSONObject user_object = new JSONObject();
    activity_details.put("activityName", activity.getActivityName());
    activity_details.put("activityHashID", activity.getActivityHashID());
    activity_details.put("status", activity.getStatus());
    activity_details.put("hash", activity.getUserHashId());
    activity_details.put("id", activity.getID());
    activity_details.put("time", activity.getTime());
    activity_details.put("schedule", activity.getSchedule());
    user_object.put("activities", activity_details);
    String data_loc = "goaltimer-dbdump/" + activity.getUserHashId() + "/activities/" + activity.getActivityName() + "_" + activity.getUserHashId() + "/" + activity.getActivityName() + "_Info.json";
    File activityFile = new File(data_loc);
    StringBuffer sb = new StringBuffer();
    if (!activityFile.exists()) {
      try (BufferedWriter writer = new BufferedWriter(new FileWriter(activityFile))) {
        sb.append(activity_details);
        writer.write(sb.toString());
      }
    }
  }
  
  @SuppressWarnings("unchecked")
  private void checkPath(Activity newActivity) throws Exception{
    String[] tokens = newActivity.getActivityName().split(",");
    String user_hash_id = tokens[1];
    String activityName = tokens[0];
    newActivity.setUserHashId(user_hash_id);
    newActivity.setActivityName(activityName);
    newActivity.setActivityHashID(newActivity.hash(activityName));
    try{
        List<Activity> activitiesList = new ArrayList<>();
        activitiesList.add(newActivity);
        final String JSON_DATA = get_data("goaltimer-dbdump/" + user_hash_id +  "/activities/" + activityName + "_" + user_hash_id + "/" + activityName +  "_Info.json").toString();
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(JSON_DATA);
        Iterator<JSONObject> iterator = json.values().iterator();
        while (iterator.hasNext()) {
            activitiesList.add(setActivity(iterator.next()));
         }
         for( Iterator<Activity> iter = activitiesList.iterator(); iter.hasNext();){
            writeJSON(iter.next());
            get_data("goaltimer-dbdump/" + user_hash_id +  "/activities/" + activityName + "_" + user_hash_id + "/"+ activityName  +  "_Info.json");
         }
    }
    catch (Exception hre) {
      File userDir = new File("goaltimer-dbdump/" + user_hash_id + "/activities/" + activityName + "_" + user_hash_id + "/");
      if (!userDir.exists()) {
        userDir.mkdirs();
      }
      JSONObject activity_details = new JSONObject();
      JSONObject user_object = new JSONObject();
      activity_details.put("activityName", activityName);
      activity_details.put("status", newActivity.getStatus());
      activity_details.put("activityHashID", newActivity.getActivityHashID());
      activity_details.put("hash", user_hash_id);
      activity_details.put("id", newActivity.getID());
      activity_details.put("time", newActivity.getTime());
      activity_details.put("schedule", newActivity.getSchedule());
      user_object.put("activities", activity_details);
      String data_loc = "goaltimer-dbdump/" + user_hash_id +  "/activities/" + activityName + "_" + user_hash_id + "/" + activityName +  "_Info.json";
      File activityFile = new File(data_loc);
      StringBuffer sb = new StringBuffer();
      if (!activityFile.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(activityFile))) {
          sb.append(activity_details);
          writer.write(sb.toString());
        }
      }
      repository.save(newActivity);
      store_data("goaltimer-dbdump/" + user_hash_id + "/activities/" + activityName + "_" + user_hash_id + "/" + activityName +  "_Info.json");
    }
  }



}
/**
 * 
 * 

    String[] tokens = newActivity.getActivityName().split(",");
    String user_hash_id = tokens[1];
    String activityName = tokens[0];
    System.out.println(tokens[1]);
    System.out.println(tokens[0]);
    System.out.println(newActivity.getTime());
    System.out.println(newActivity.getSchedule());
    System.out.println(newActivity.getStatus());
    final String JSON_DATA = get_data("goaltimer-dbdump/" + user_hash_id + "/activities.json");
    if (JSON_DATA.length() <= 0){
     
        JSONObject activity_details = new JSONObject();
        JSONObject user_object = new JSONObject();
        activity_details.put("activityName", activityName);
        activity_details.put("status", newActivity.getStatus());
        activity_details.put("hash", user_hash_id);
        activity_details.put("id", newActivity.getID());
        activity_details.put("time", newActivity.getTime());
        activity_details.put("schedule", newActivity.getSchedule());
        user_object.put("activities", activity_details);
        String data_loc = "goaltimer-dbdump/" + user_hash_id + "/activities.json";
        File activityFile = new File(data_loc);
        StringBuffer sb = new StringBuffer();
        if (!activityFile.exists()) {
          try (BufferedWriter writer = new BufferedWriter(new FileWriter(activityFile))) {
            sb.append(activity_details);
            writer.write(sb.toString());
          }
      }
      store_data(data_loc);
    }
    else{

    }
    //JSONParser parser = new JSONParser();
    //JSONObject json = (JSONObject) parser.parse(JSON_DATA);
   // System.out.println(JSON_DATA.length());
   // if (parser.parse(JSON_DATA) == null){
    //  System.out.println("JSON_DATA.length()");
   // }
    //else{
      //
      //
    //  System.out.println("JSON_DATA.lengtasdasdh()");
    //}


    
    

    /*
    File userDir = new File("goaltimer-dbdump/" + user_hash_id);
    if (!userDir.exists()) {
      userDir.mkdirs();
    } else {
      JSONObject activity_details = new JSONObject();
      JSONObject user_object = new JSONObject();
      activity_details.put("activityName", activityName);
      activity_details.put("status", newActivity.getStatus());
      activity_details.put("hash", user_hash_id);
      activity_details.put("id", newActivity.getID());
      activity_details.put("time", newActivity.getTime());
      activity_details.put("schedule", newActivity.getSchedule());
      user_object.put("activities", activity_details);
      String data_loc = "goaltimer-dbdump/" + user_hash_id + "/activities.json";
      File activityFile = new File(data_loc);
      StringBuffer sb = new StringBuffer();
      if (!activityFile.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(activityFile))) {
          sb.append(activity_details);
          writer.write(sb.toString());
        }
      }
    }*/
 
