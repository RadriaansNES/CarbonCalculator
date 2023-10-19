package com.carboncalc.onrender.backend.controller;

import com.carboncalc.onrender.backend.model.CarbonFootprint;
import com.carboncalc.onrender.backend.service.CarbonFootprintService;
import com.carboncalc.onrender.backend.model.CarbonFootprintDTO;
import com.carboncalc.onrender.backend.model.User;
import com.carboncalc.onrender.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/carbon-footprints")
public class CarbonFootprintController {
    private final CarbonFootprintService carbonFootprintService;
    private final UserRepository userRepository;

    @Autowired
    public CarbonFootprintController(
            CarbonFootprintService carbonFootprintService,
            UserRepository userRepository) {
        this.carbonFootprintService = carbonFootprintService;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<CarbonFootprint> createCarbonFootprint(@RequestBody CarbonFootprintDTO carbonFootprintDTO) {
        Long userId = carbonFootprintDTO.getUserId();

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        CarbonFootprint carbonFootprint = new CarbonFootprint(
                user,
                carbonFootprintDTO.getTotalVehicleEmissions(),
                carbonFootprintDTO.getTotalDietaryEmissions(),
                carbonFootprintDTO.getTotalWaterEmission(),
                carbonFootprintDTO.getTotalEnergyEmissions(),
                carbonFootprintDTO.getTotalWasteEmissions(),
                carbonFootprintDTO.getTotalVacayEmissions(),
                carbonFootprintDTO.getTotalEmissions(),
                carbonFootprintDTO.getCalculationDate());

        CarbonFootprint createdFootprint = carbonFootprintService.saveCarbonFootprint(carbonFootprint);

        return ResponseEntity.ok(createdFootprint);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarbonFootprint> getCarbonFootprint(@PathVariable Long id) {
        CarbonFootprint carbonFootprint = carbonFootprintService.getCarbonFootprintById(id);

        if (carbonFootprint != null) {
            return ResponseEntity.ok(carbonFootprint);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CarbonFootprint>> getCarbonFootprintsByUser(@PathVariable Long userId) {
        List<CarbonFootprint> carbonFootprints = carbonFootprintService.getCarbonFootprintsByUserId(userId);

        return ResponseEntity.ok(carbonFootprints);
    }

    @GetMapping("/lowest-emission/{username}")
    public ResponseEntity<CarbonFootprint> getLowestEmissionByUsername(@PathVariable String username) {
        CarbonFootprint carbonFootprint = carbonFootprintService.getLowestEmissionByUsername(username);

        if (carbonFootprint != null) {
            return ResponseEntity.ok(carbonFootprint);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/last-three-footprints/{username}")
    public ResponseEntity<List<CarbonFootprint>> getLastThreeFootprintsByUsername(@PathVariable String username) {
        List<CarbonFootprint> lastThreeFootprints = carbonFootprintService
                .getLastThreeCarbonFootprintsByUsername(username);

        return ResponseEntity.ok(lastThreeFootprints);
    }

    @GetMapping("/best-footprints-this-month")
    public ResponseEntity<List<CarbonFootprint>> getBestFootprintsThisMonth() {

        LocalDate currentDate = LocalDate.now();
        LocalDate startOfMonth = LocalDate.of(currentDate.getYear(), currentDate.getMonth(), 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);

        Date startDate = Date.from(startOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());

        List<CarbonFootprint> bestFootprints = carbonFootprintService.getBestFootprintsThisMonth(startDate, endDate);

        return ResponseEntity.ok(bestFootprints);
    }

    @GetMapping("/recent-footprints")
    public ResponseEntity<List<CarbonFootprint>> getRecentFootprints() {
        LocalDate currentDate = LocalDate.now();
        LocalDate startOfMonth = LocalDate.of(currentDate.getYear(), currentDate.getMonth(), 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);

        Date startDate = Date.from(startOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());

        List<CarbonFootprint> bestFootprints = carbonFootprintService.getBestFootprintsThisMonth(startDate, endDate);
        List<CarbonFootprint> recentFootprints = carbonFootprintService.getRecentFootprints(startDate, endDate,
                bestFootprints);

        return ResponseEntity.ok(recentFootprints);
    }
}
