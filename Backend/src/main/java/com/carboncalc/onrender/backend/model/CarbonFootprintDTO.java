package com.carboncalc.onrender.backend.model;

import java.sql.Date;

public class CarbonFootprintDTO {
    private Long userId; 
    private double footprintValue; 
    private Date calculationDate; 

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getFootprintValue() {
        return footprintValue;
    }

    public void setFootprintValue(double footprintValue) {
        this.footprintValue = footprintValue;
    }

    public Date getCalculationDate() {
        return calculationDate;
    }

    public void setCalculationDate(Date calculationDate) {
        this.calculationDate = calculationDate;
    }
}
