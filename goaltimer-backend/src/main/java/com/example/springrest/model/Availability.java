package com.example.springrest.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;
import lombok.Data;

@Entity
public class Availability {
        private @Id @GeneratedValue Long data_id;
    @Column(nullable = true) private int user_id;
    @Column(nullable = true) private int hour;
    @Column(nullable = true) private int min;
    @Column(nullable = true) private String amPm;
    @Column(nullable = true) private String day;

public Availability(){
}

public Availability(int user_id, int hour, int min, String amPm, String day) {
        super();
        this.user_id = user_id;
        this.hour = hour;
        this.min = min;
        this.amPm = amPm;
        this.day = day;
    }
    
public int getUserID(){
        return this.user_id;
    }
    public int getHour(){
        return this.hour;
    }
    public int getMin(){
        return this.min;
    }
    public String getAmPm(){
    return this.amPm;
    }
    public String getDay(){
    return this.day;
    }
    public void setUserID(int user_id){
        this.user_id = user_id;
    }
    public int setHour(){
        return this.hour;
    }
    public int setMin(){
        return this.min;
    }
    public String setAmPm(){
    return this.amPm;
    }
    public String setDay(){
    return this.day;
    }

}
