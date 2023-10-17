package com.carboncalc.onrender.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.carboncalc.onrender.backend.repository.CarbonFootprintRepository;
import com.carboncalc.onrender.backend.model.CarbonFootprint;

@Service
public class CarbonFootprintService {
    private final CarbonFootprintRepository carbonFootprintRepository;

    @Autowired
    public CarbonFootprintService(CarbonFootprintRepository carbonFootprintRepository) {
        this.carbonFootprintRepository = carbonFootprintRepository;
    }

    public CarbonFootprint saveCarbonFootprint(CarbonFootprint carbonFootprint) {
        return carbonFootprintRepository.save(carbonFootprint);
    }

    public CarbonFootprint getCarbonFootprintById(Long id) {
        return carbonFootprintRepository.findById(id).orElse(null);
    }

    public List<CarbonFootprint> getCarbonFootprintsByUserId(Long userId) {
        return carbonFootprintRepository.findByUserId(userId);
    }
}
