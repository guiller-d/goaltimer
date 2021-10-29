package com.example.springrest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
    private String activityID;

    public Activity() {
    }

    public Activity(String activityName, Boolean status, String schedule, String activityID) {
        this.activityName = activityName;
        this.schedule = schedule;
        this.status = status;
        this.activityID = activityID;
    }
    public String getActivityName() {
        return this.activityName;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public String getSchedule() {
        return this.schedule;
    }

    public Long getID() {
        return this.id;
    }
    public String getActivityID(){
        return this.activityID;
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
    public void setActivityID(String activityID){
        this.activityID = activityID;
    }
}