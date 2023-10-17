package com.carboncalc.onrender.backend.model;

import java.sql.Date;

public class CarbonFootprintDTO {
    private Long userId;
    private Double totalVehicleEmissions;
    private Double totalDietaryEmissions;
    private Double totalWaterEmission;
    private Double totalEnergyEmissions;
    private Double totalWasteEmissions;
    private Double totalVacayEmissions;
    private Double totalEmissions;
    private double footprintValue;
    private Date calculationDate;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getTotalVehicleEmissions() {
        return totalVehicleEmissions;
    }

    public void setTotalVehicleEmissions(Double totalVehicleEmissions) {
        this.totalVehicleEmissions = totalVehicleEmissions;
    }

    public Double getTotalDietaryEmissions() {
        return totalDietaryEmissions;
    }

    public void setTotalDietaryEmissions(Double totalDietaryEmissions) {
        this.totalDietaryEmissions = totalDietaryEmissions;
    }

    public Double getTotalWaterEmission() {
        return totalWaterEmission;
    }

    public void setTotalWaterEmission(Double totalWaterEmission) {
        this.totalWaterEmission = totalWaterEmission;
    }

    public Double getTotalEnergyEmissions() {
        return totalEnergyEmissions;
    }

    public void setTotalEnergyEmissions(Double totalEnergyEmissions) {
        this.totalEnergyEmissions = totalEnergyEmissions;
    }

    public Double getTotalWasteEmissions() {
        return totalWasteEmissions;
    }

    public void setTotalWasteEmissions(Double totalWasteEmissions) {
        this.totalWasteEmissions = totalWasteEmissions;
    }

    public Double getTotalVacayEmissions() {
        return totalVacayEmissions;
    }

    public void setTotalVacayEmissions(Double totalVacayEmissions) {
        this.totalVacayEmissions = totalVacayEmissions;
    }

    public Double getTotalEmissions() {
        return totalEmissions;
    }

    public void setTotalEmissions(Double totalEmissions) {
        this.totalEmissions = totalEmissions;
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
