package com.carboncalc.onrender.backend.model;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class CarbonFootprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private Double footprintValue;

    @Column(columnDefinition = "DATE")
    private Date calculationDate;
    public CarbonFootprint() {
    }

    public CarbonFootprint(User user, Double footprintValue, Date calculationDate) {
        this.user = user;
        this.footprintValue = footprintValue;
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

    public Double getFootprintValue() {
        return footprintValue;
    }

    public void setFootprintValue(Double footprintValue) {
        this.footprintValue = footprintValue;
    }

    public Date getCalculationDate() {
        return calculationDate;
    }

    public void setCalculationDate(Date calculationDate) {
        this.calculationDate = calculationDate;
    }
}
