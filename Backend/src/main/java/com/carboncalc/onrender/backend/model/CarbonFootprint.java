package com.carboncalc.onrender.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "CARBONFOOTPRINTS")
public class CarbonFootprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Column(name = "TOTALVEHICLEEMISSIONS")
    private Double totalVehicleEmissions;

    @Column(name = "TOTALDIETARYEMISSIONS")
    private Double totalDietaryEmissions;

    @Column(name = "TOTALWATEREMISSION")
    private Double totalWaterEmission;

    @Column(name = "TOTALENERGYEMISSIONS")
    private Double totalEnergyEmissions;

    @Column(name = "TOTALWASTEEMISSIONS")
    private Double totalWasteEmissions;

    @Column(name = "TOTALVACAYEMISSIONS")
    private Double totalVacayEmissions;

    @Column(name = "TOTALEMISSIONS")
    private Double totalEmissions;

    @Column(columnDefinition = "DATE", name = "CALCULATIONDATE")
    private Date calculationDate;

    public CarbonFootprint() {
    }

    public CarbonFootprint(
            User user,
            Double totalVehicleEmissions,
            Double totalDietaryEmissions,
            Double totalWaterEmission,
            Double totalEnergyEmissions,
            Double totalWasteEmissions,
            Double totalVacayEmissions,
            Double totalEmissions,
            Date calculationDate) {
        this.user = user;
        this.totalVehicleEmissions = totalVehicleEmissions;
        this.totalDietaryEmissions = totalDietaryEmissions;
        this.totalWaterEmission = totalWaterEmission;
        this.totalEnergyEmissions = totalEnergyEmissions;
        this.totalWasteEmissions = totalWasteEmissions;
        this.totalVacayEmissions = totalVacayEmissions;
        this.totalEmissions = totalEmissions;
        this.calculationDate = calculationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Date getCalculationDate() {
        return calculationDate;
    }

    public void setCalculationDate(Date calculationDate) {
        this.calculationDate = calculationDate;
    }
}
