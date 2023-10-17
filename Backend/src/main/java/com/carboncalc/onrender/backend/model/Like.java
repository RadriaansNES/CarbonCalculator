package com.carboncalc.onrender.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private CarbonFootprint carbonFootprint;

    @ManyToOne
    private User user;

    private Date likeDate;

    public Like() {
    }

    public Like(CarbonFootprint carbonFootprint, User user, Date likeDate) {
        this.carbonFootprint = carbonFootprint;
        this.user = user;
        this.likeDate = likeDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CarbonFootprint getCarbonFootprint() {
        return carbonFootprint;
    }

    public void setCarbonFootprint(CarbonFootprint carbonFootprint) {
        this.carbonFootprint = carbonFootprint;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getLikeDate() {
        return likeDate;
    }

    public void setLikeDate(Date likeDate) {
        this.likeDate = likeDate;
    }
}
