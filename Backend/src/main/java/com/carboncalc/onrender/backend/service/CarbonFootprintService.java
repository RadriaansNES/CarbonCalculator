package com.carboncalc.onrender.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    public CarbonFootprint getLowestEmissionByUsername(String username) {
        List<CarbonFootprint> results = carbonFootprintRepository.findLowestEmissionByUser(username);
        return results.isEmpty() ? null : results.get(0);
    }

    public List<CarbonFootprint> getLastThreeCarbonFootprintsByUsername(String username) {

        List<CarbonFootprint> allFootprints = carbonFootprintRepository.findByUserUsername(username);
        CarbonFootprint lowestEmissionFootprint = getLowestEmissionByUsername(username);

        allFootprints.remove(lowestEmissionFootprint);

        allFootprints.sort(Comparator.comparing(CarbonFootprint::getCalculationDate).reversed());

        return allFootprints.stream()
                .limit(3)
                .collect(Collectors.toList());
    }

    public List<CarbonFootprint> getBestFootprintsThisMonth(Date startDate, Date endDate) {
    
        List<CarbonFootprint> allFootprints = carbonFootprintRepository.findBestFootprintsThisMonth(startDate, endDate);
        List<CarbonFootprint> sortedFootprints = allFootprints.stream()
                .sorted(Comparator.comparingDouble(CarbonFootprint::getTotalEmissions))
                .collect(Collectors.toList());

        return sortedFootprints.stream()
                .limit(3)
                .collect(Collectors.toList());
    }

    public List<CarbonFootprint> getRecentFootprints() {
        return carbonFootprintRepository.findRecentFootprints();
    }
}
