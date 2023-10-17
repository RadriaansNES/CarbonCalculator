package com.carboncalc.onrender.backend.controller;

import com.carboncalc.onrender.backend.model.CarbonFootprint;
import com.carboncalc.onrender.backend.service.CarbonFootprintService;
import com.carboncalc.onrender.backend.model.CarbonFootprintDTO;
import com.carboncalc.onrender.backend.model.User;
import com.carboncalc.onrender.backend.repository.UserRepository; // Import UserRepository

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carbon-footprints")
public class CarbonFootprintController {
    private final CarbonFootprintService carbonFootprintService;
    private final UserRepository userRepository;

    @Autowired
    public CarbonFootprintController(
            CarbonFootprintService carbonFootprintService,
            UserRepository userRepository 
    ) {
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
                carbonFootprintDTO.getFootprintValue(),
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
}
