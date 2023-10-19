package com.carboncalc.onrender.backend.model;

import java.util.Date;

public class CommentDTO {
    private Long carbonFootprintId;
    private Long userId; 
    private String commentText; 
    private Date commentDate; 

    public Long getCarbonFootprintId() {
        return carbonFootprintId;
    }

    public void setCarbonFootprintId(Long carbonFootprintId) {
        this.carbonFootprintId = carbonFootprintId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
