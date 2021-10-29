package com.example.springrest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

  private @Id @GeneratedValue Long id;
  
  @Column(nullable = false) private String firstName;
  @Column(nullable = false) private String lastName;
  @Column(nullable = false) private String email;
  @Column(nullable = false) private String password;

  public User() {}

  public User(String firstName, String lastName, String email, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
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
  public String getEmail(){
    return this.email;
  }
  public String getPassword() {
    return this.password;
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

  @Override
  public String toString() {
    return "User{" + "id=" + this.id + 
                        ", firstName='" + this.firstName + '\'' + 
                        ", lastName='" + this.lastName + '\'' + 
                        ", email='" + this.email + '\'' + 
                        ", password='" + this.password + '\'' + '}';
  }
}