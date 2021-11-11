package com.example.springrest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.security.MessageDigest;
import java.util.Random;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;
import com.google.cloud.storage.BlobId;

@Entity
public class User {

  private @Id @GeneratedValue Long id;
  @Column(nullable = true)
  private String hash_id;
  @Column(nullable = true)
  private BlobId blob_id;
  @Column(nullable = false)
  private String firstName;
  @Column(nullable = false)
  private String lastName;
  @Column(nullable = false)
  private String email;
  @Column(nullable = false)
  private String password;

  public User() {
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

  public User(String firstName, String lastName, String email, String password) throws Exception {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.hash_id = hash(email);
  }

  public String getName() {
    return this.firstName + " " + this.lastName;
  }

  public Long getId() {
    return this.id;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public String getEmail() {
    return this.email;
  }

  public String getPassword() {
    return this.password;
  }

  public String getHashID() {
    return this.hash_id;
  }
  public BlobId getBlobID() {
    return this.blob_id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setHashID(String hash_id) {
    this.hash_id = hash_id;
  }
  public void setBlobId(BlobId blob_id) {
    this.blob_id = blob_id;
  }

  @Override
  public String toString() {
    return "User{" + "id=" + this.id + ", firstName='" + this.firstName + '\'' + ", lastName='" + this.lastName + '\''
        + ", email='" + this.email + '\'' + ", password='" + this.password + '\'' + '}';
  }
}