package com.carboncalc.onrender.backend.model;

import java.sql.Date;

public class LikeDTO {
    private Long carbonFootprintId; 
    private Long userId;
    private Date likeDate;

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

    public Date getLikeDate() {
        return likeDate;
    }

    public void setLikeDate(Date likeDate) {
        this.likeDate = likeDate;
    }
}

