package com.carboncalc.onrender.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "COMMENTS")

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private CarbonFootprint carbonFootprint;

    @ManyToOne
    private User user;

    private String commentText;

    private Date commentDate;

    public Comment() {
    }

    public Comment(CarbonFootprint carbonFootprint, User user, String commentText, Date commentDate) {
        this.carbonFootprint = carbonFootprint;
        this.user = user;
        this.commentText = commentText;
        this.commentDate = commentDate;
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

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }
}
