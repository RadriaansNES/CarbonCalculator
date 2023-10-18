package com.carboncalc.onrender.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
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
        // Retrieve all carbon footprints for the user
        List<CarbonFootprint> allFootprints = carbonFootprintRepository.findByUserUsername(username);

        // Find the lowest emission footprint (you already have this method)
        CarbonFootprint lowestEmissionFootprint = getLowestEmissionByUsername(username);

        // Remove the lowest emission footprint from the list
        allFootprints.remove(lowestEmissionFootprint);

        // Sort the list of footprints by date in descending order
        allFootprints.sort(Comparator.comparing(CarbonFootprint::getCalculationDate).reversed());

        // Return the last three footprints
        return allFootprints.stream()
                .limit(3)
                .collect(Collectors.toList());
    }
}
