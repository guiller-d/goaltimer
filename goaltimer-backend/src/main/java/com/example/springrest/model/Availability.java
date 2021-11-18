package com.example.springrest.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.security.MessageDigest;
import java.util.Random;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;
import com.example.springrest.model.User;

@Entity
public class Availability {
        private @Id @GeneratedValue Long id;
    @Column(nullable = true) private String hashID;
    @Column(nullable = true) private String fromHour;
    @Column(nullable = true) private String fromMin;
    @Column(nullable = true) private String fromAmPm;
    @Column(nullable = true) private String toHour;
    @Column(nullable = true) private String toMin;
    @Column(nullable = true) private String toAmPm;
    @Column(nullable = true) private String day;
    @Column(nullable = true) private String email;
public Availability(){
}

public Availability(String fromHour, String fromMin, String fromAmPm, String toHour, String toMin, String toAmPm, String day, String email) throws Exception{
        super();
        this.fromHour = fromHour;
        this.fromMin = fromMin;
        this.fromAmPm = fromAmPm;
        this.toHour = toHour;
        this.toMin = toMin;
        this.toAmPm = toAmPm;
        this.day = day;
        this.email = email;
        this.hashID = hash(email) ;
    }

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


    public Long getId() {
    return this.id;
    }
    public String getFromHour(){
        return this.fromHour;
    }
    public String getFromMin(){
        return this.fromMin;
    }
    public String getFromAmPm(){
    return this.fromAmPm;
    }
    public String getToHour(){
        return this.toHour;
    }
    public String getToMin(){
        return this.toMin;
    }
    public String getToAmPm(){
    return this.toAmPm;
    }
    public String getDay(){
    return this.day;
    }
  public String getHashID() {
    return this.hashID;
  }
  public String getEmail() {
    return this.email;
  }
  public void setId(Long id) {
    this.id = id;
  }
    public String setFromHour(){
        return this.fromHour;
    }
    public String setFromMin(){
        return this.fromMin;
    }
    public String setFromAmPm(){
    return this.fromAmPm;
    }
    public String setToHour(){
        return this.toHour;
    }
    public String setToMin(){
        return this.toMin;
    }
    public String setToAmPm(){
    return this.toAmPm;
    }
    public String setDay(){
    return this.day;
    }
    public String setEmail() {
    return this.email;
  }
    public void setHashID(String hash_id) {
    this.hashID = hash_id;
  }

  @Override
    public String toString() {
    return "Availability{" + "id= " + this.id + ", From='" + this.fromHour   + ":" + this.fromMin
        + " " + this.fromAmPm  + ", To= " + this.toHour  + ":" + this.toMin 
        + " " + this.toAmPm  + ", Day='" + this.day   + ", email='" + this.email + '}';
    }

}