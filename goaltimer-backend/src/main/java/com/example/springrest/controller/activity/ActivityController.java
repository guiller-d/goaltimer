package com.example.springrest.controller.activity;

import java.util.Iterator;
import java.util.List;
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

import com.example.springrest.model.Activity;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.Random;

@RestController
public class ActivityController {

    private final ActivityRepository repository;
    private static String session_id;

    ActivityController(ActivityRepository repository) {
        this.repository = repository;
    }
    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/activities")
    public List<Activity> all() {
        List<Activity> activities = repository.findAll();
        return activities;
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
