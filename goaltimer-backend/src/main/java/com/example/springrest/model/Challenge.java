package com.example.springrest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;
import java.io.UnsupportedEncodingException;
@Entity
public class Challenge {

    private @Id @GeneratedValue Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = true) private String description;
    @Column(nullable = false) private int time; // # of days for a challenge
    @Column(nullable = false) private boolean isActive;
    @Column(nullable = true) private boolean isComplete;
    @Column(nullable = true) private boolean onStreak;
    @Column(nullable = true) private int numOfDays;
    @Column(nullable = true) private int daysCompleted;
    @Column(nullable = true) private String challengeHashID;
    @Column(nullable = true) private String userHashID;
    
    private String convertByteArrayToHexString(byte[] arrayBytes) {
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < arrayBytes.length; i++) {
          stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        return stringBuffer.toString();
      }
    
      public String hash(String email) throws Exception {
        try {
          String userInfo = email;
          byte[] hashedBytes = userInfo.getBytes("UTF-8");
          return convertByteArrayToHexString(hashedBytes);
        } catch (UnsupportedEncodingException ex) {
          throw new Exception("Could not generate hash from String");
    
        }
      }
    public Challenge() {}

    public Challenge(String name, String description, boolean isActive, boolean isComplete) throws Exception {
        super();
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.isComplete = isComplete;
        this.challengeHashID = hash(name + description);
    }

    public void setId(Long id) {
        this.id = id;
      }
    public void setName(String name){
        this.name = name;
    }
    public void setdescription(String description){
        this.description = description;
    }
    public void setActive(boolean isActive){
        this.isActive = isActive;
    }
    public void setTime(int time) {
        this.time = time;
    }
    public void setComplete(boolean isComplete){
        this.isComplete = isComplete;
    }
    public Long getId() {
        return this.id;
      }
    public String getName(){
        return this.name;
    }
    public String getdescription(){
        return this.description;
    }
    public String challengeHashID(){
        return this.challengeHashID;
    }
    public int getTime(){
        return this.time;
    }
    public boolean isActive(){
        return this.isActive;
    }
    public boolean isComplete(){
        return this.isComplete;
    }
    public void setUserHashID(String userHashID){
        this.userHashID = userHashID;
    }
    public String getUserHashID(){
        return this.userHashID;
    }
}