
package com.example.springrest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ChallengeTime {
    private @Id @GeneratedValue Long id;
    @Column(nullable = true)
    private String time;
    @Column(nullable = true)
    private String date;
    @Column(nullable = true)
    private String challengeHashID;
    @Column(nullable = true)
    private String userHashID;
    @Column(nullable = true)
    private String challengeName;

    public ChallengeTime() {
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

    public String getChallengeHashID() {
        return this.challengeHashID;
    }

    public String getChallengeName() {
        return this.challengeName;
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

    public void setChallengeHashID(String challengeHashID) {
        this.challengeHashID = challengeHashID;
    }

    public void setChallengeName(String challengeName) {
        this.challengeName = challengeName;
    }
}
