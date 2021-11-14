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
    @Column(nullable = true) private String hash_id;
    @Column(nullable = true) private String hour;
    @Column(nullable = true) private String min;
    @Column(nullable = true) private String amPm;
    @Column(nullable = true) private String day;
    @Column(nullable = true) private String email;
public Availability(){
}

public Availability(String hour, String min, String amPm, String day, String email) throws Exception{
        super();
        this.hour = hour;
        this.min = min;
        this.amPm = amPm;
        this.day = day;
        this.email = email;
        this.hash_id = hash(email) ;
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
    public String getHour(){
        return this.hour;
    }
    public String getMin(){
        return this.min;
    }
    public String getAmPm(){
    return this.amPm;
    }
    public String getDay(){
    return this.day;
    }
  public String getHashID() {
    return this.hash_id;
  }
  public String getEmail() {
    return this.email;
  }
  public void setId(Long id) {
    this.id = id;
  }
    public String setHour(){
        return this.hour;
    }
    public String setMin(){
        return this.min;
    }
    public String setAmPm(){
    return this.amPm;
    }
    public String setDay(){
    return this.day;
    }
    public String setEmail() {
    return this.email;
  }
    public void setHashID(String hash_id) {
    this.hash_id = hash_id;
  }

  @Override
    public String toString() {
    return "Availability{" + "id=" + this.id + ", Hour='" + this.hour + '\'' + ", Min='" + this.min + '\''
        + ", am or pm='" + this.amPm + '\'' + ", Day='" + this.day + '\'' + ", email='" + this.email + '}';
    }

}