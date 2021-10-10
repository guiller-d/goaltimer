package com.example.springrest.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Time {

    private @Id @GeneratedValue Long data_id;
    @Column(nullable = true) private int user_id;
    @Column(nullable = true) private String oz;
    @Column(nullable = true) private String date;

    public Time (){}

    public Time(int user_id, String oz, String date) {
        super();
        this.user_id = user_id;
        this.oz = oz;
        this.date = date;
    }
    public int getUserID(){
        return this.user_id;
    }
    public String getOZ(){
        return this.oz;
    }
    public String getDate(){
        return this.date;
    }
    public void setUserID(int user_id){
        this.user_id = user_id;
    }
    public void setOZ(String oz){
        this.oz = oz;
    }
    public void setDate(String date){
        this.date = date;
    }

}