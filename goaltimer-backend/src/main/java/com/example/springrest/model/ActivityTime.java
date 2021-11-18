package com.example.springrest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ActivityTime {
  private @Id @GeneratedValue Long id;
  @Column(nullable = true)
  private String time;
  @Column(nullable = true)
  private String date;
  @Column(nullable = true)
  private String activityHashID;
  @Column(nullable = true)
  private String userHashID;
  @Column(nullable = true)
  private String activityName;


  public ActivityTime() {
  }

  public Long getId() {
    return this.id;
  }

  public String getTime() {
    return this.time;
  }

  public String getDate() {
    return this.date;
  }

  public String getActivityHashID() {
    return this.activityHashID;
  }


  public String getUserHashID() {
    return this.userHashID;
  }
  public String getActivityName() {
    return this.activityName;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setActivityHashID(String activityHashID) {
    this.activityHashID = activityHashID;
  }

  public void setUserHashID(String userHashID) {
    this.userHashID = userHashID;
  }
  public void setActivityName(String activityName) {
    this.activityName =  activityName;
  }
}