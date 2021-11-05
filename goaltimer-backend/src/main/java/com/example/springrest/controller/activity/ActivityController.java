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
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.Random;


import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.ReadChannel;

import com.example.springrest.model.User;

@RestController
public class ActivityController {
    @Autowired
    private Storage storage = StorageOptions.getDefaultInstance().getService(); 

 

    private final ActivityRepository repository;
    private static String session_id;
    private final String bucket_name = "goaltimer";

    ActivityController(ActivityRepository repository) {
        this.repository = repository;
    }
    public String get_data(String data_loc) throws IOException {
        StringBuffer sb = new StringBuffer();
        if (storage.get(bucket_name, data_loc) == null) {
            return "File doesn't exists: "+ data_loc;
        }
        else{
            try(ReadChannel channel = storage.reader(bucket_name, data_loc)){
                ByteBuffer bytes = ByteBuffer.allocate(64*1024);
                while(channel.read(bytes) > 0){
                    bytes.flip();
                    String data = new String(bytes.array(), 0, bytes.limit());
                    sb.append(data);
                    bytes.clear();
                }
                return sb.toString();
            }   
        }
    }
    public String store_data(String data_loc){
        if (storage.get(bucket_name, data_loc) == null) {
            BlobId id = BlobId.of(bucket_name, data_loc);
            BlobInfo info = BlobInfo.newBuilder(id).build();
            List<Activity> activities = repository.findAll();
            byte[] arr =  activities.toString().getBytes();
            storage.create(info, arr);
            return "File uploaded to "+ data_loc;
        }
        return "File failed to upload to " + data_loc;
    }
    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/activities")
    public List<Activity> all() throws IOException{
        List<Activity> activities = repository.findAll();
        StringBuilder sb = new StringBuilder(); 
        sb.append(activities.toString());  
        File file = new File("src/main/java/com/example/springrest/databasedump/activities/activities.txt");
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(sb.toString());
        }
        return activities;
    }
   
    @GetMapping("/getUserActivity")
    public List<Activity> getUserActivity() throws IOException{
        List<Activity> activities = repository.findAll();
        StringBuilder sb = new StringBuilder(); 
        sb.append(activities.toString());  
        File file = new File("src/main/java/com/example/springrest/databasedump/activities/activities.txt");
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(sb.toString());
        }
        return activities;
    }
    

    @PostMapping(value = "/addActivity")
    public String newEmployee(@RequestBody Activity newActivity) {
      System.out.println(newActivity);
      repository.save(newActivity);
      return "new user successfully added";
    }
    @GetMapping("/get-user-activity")
    public String getActivities() throws IOException {
        StringBuffer sb = new StringBuffer();
        String data_name = "testing";
        if (storage.get(bucket_name, data_name) == null) {
            BlobId id = BlobId.of(bucket_name, data_name);
            BlobInfo info = BlobInfo.newBuilder(id).build();
            List<Activity> activities = repository.findAll();
            byte[] arr =  activities.toString().getBytes();
            storage.create(info, arr);
            return "File doesn't exists: "+ data_name;
        }else{
            System.out.println("File exists: "+ data_name);
            try(ReadChannel channel = storage.reader(bucket_name, data_name)){
                ByteBuffer bytes = ByteBuffer.allocate(64*1024);
                while(channel.read(bytes) > 0){
                    bytes.flip();
                    String data = new String(bytes.array(), 0, bytes.limit());
                    sb.append(data);
                    bytes.clear();
                }
                return sb.toString();
            }   
        }
    }


    @PostMapping(value = "/getActivity/")
    public Activity getEmployee(@RequestBody Activity activity, HttpSession session) throws Exception {
        // return session.getAttribute("email") + ", " + session.getAttribute("pwd");
        String activityID = activity.getActivityID();
        Activity activity_temp = null;
        List<Activity> activities = repository.findByActivityID(activityID);
        // if (users.size() <= 0) return -1;
        for (Iterator<Activity> iter = activities.iterator(); iter.hasNext();) {
            Activity element = iter.next();
            if (element.getActivityName().equals(activityID)) {
                activity_temp = element;
            }
            // assign specific session_id to that user
            try {
                String dateAndTime = LocalDateTime.now() + "";
                MessageDigest digest = MessageDigest.getInstance("MD5");
                Random rand = new Random();
                byte[] hashedBytes = digest.digest(dateAndTime.getBytes("UTF-8"));
                session_id = convertByteArrayToHexString(hashedBytes);
                session.setAttribute(session_id, activity_temp);
            } catch (NoSuchAlgorithmException | UnsupportedEncodingException ex) {
                throw new Exception("Could not generate hash from String");
            }
            break;
        }
        return activity_temp;
    }

    private static String convertByteArrayToHexString(byte[] arrayBytes) {
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < arrayBytes.length; i++) {
            stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        return stringBuffer.toString();
    }

    @PostMapping(value = "/updateActivity/")
  public Activity updateActivity(@RequestBody Activity activity, HttpSession session) {
    //return "Testing, was in updateEmployee from Controller here";

    //User original = (User)session.getAttribute(session_id);
    String activityid = activity.getActivityID();
    String newActivityName = activity.getActivityName();
    Boolean newActivityStatus = activity.getStatus();
    String newActivitySchedule = activity.getSchedule();
    Activity original = (Activity) session.getAttribute(session_id);

    List<Activity> activities = repository.findByActivityID(activityid);
    for (Iterator<Activity> iter = activities.iterator(); iter.hasNext();) {
        Activity element = iter.next();
      if(element.getActivityName().equals(original.getActivityName())){
        
        element.setActivityName(newActivityName);
        element.setStatus(newActivityStatus);
        element.setSchedule(newActivitySchedule);
        repository.save(element);
        return element;
      }
    }
    return null;
}
}
