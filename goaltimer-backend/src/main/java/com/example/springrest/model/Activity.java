
package com.example.springrest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.UnsupportedEncodingException;

@Entity
public class Activity {

    private @Id @GeneratedValue Long id;
    @Column(nullable = false)
    private String activityName;
    @Column(nullable = false)
    private Boolean status;
    @Column(nullable = false)
    private String schedule;
    @Column(nullable = false)
    private String time;
    @Column(nullable = true)
    private String hashID;
    @Column(nullable = true)
    private String activityHashID;

    public Activity() {
    }

    public Activity(String activityName, Boolean status, String schedule, String time) {
        this.activityName = activityName;
        this.schedule = schedule;
        this.status = status;
        this.time = time;
    }
    private String convertByteArrayToHexString(byte[] arrayBytes) {
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < arrayBytes.length; i++) {
          stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        return stringBuffer.toString();
      }
    
      public String hash(String activityName) throws Exception {
        try {
          String activityInfo = activityName;
          byte[] hashedBytes = activityInfo.getBytes("UTF-8");
          return convertByteArrayToHexString(hashedBytes);
        } catch (UnsupportedEncodingException ex) {
          throw new Exception("Could not generate hash from String");
    
        }
      }
    public String getActivityName() {
        return this.activityName;
    }
    
    public Boolean getStatus() {
        return this.status;
    }
    public String getActivityHashID(){
        return this.activityHashID;
    }

    public String getSchedule() {
        return this.schedule;
    }
    public String getTime(){
        return this.time;
    }
    public Long getID() {
        return this.id;
    }

    public void setUserHashId(String hashID){
        this.hashID = hashID;
    }
    public String getUserHashId(){
        return this.hashID;
    }
    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public void setActivityHashID(String activityHashID){
        this.activityHashID = activityHashID;
    }

   

}
