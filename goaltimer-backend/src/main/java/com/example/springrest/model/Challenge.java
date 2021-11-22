package com.example.springrest.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;
import java.util.Random;

@Entity
public class Challenge {

    private @Id @GeneratedValue Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = true) private String description;
    @Column(nullable = false) private int time; // # of days for a challenge
    @Column(nullable = true) private boolean isActive;
    @Column(nullable = true) private boolean isComplete;
    @Column(nullable = true) private boolean onStreak;
    @Column(nullable = true) private int numOfDays;
    @Column(nullable = true) private int daysCompleted;

    public Challenge() {}

    public Challenge(String name, String description, boolean isActive, boolean isComplete, int time) {
        super();
        Random rand = new Random();
        this.id = rand.nextLong();
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.isComplete = isComplete;
        this.time = time;
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
    public int getTime(){
        return this.time;
    }
    public boolean isActive(){
        return this.isActive;
    }
    public boolean isComplete(){
        return this.isComplete;
    }

}