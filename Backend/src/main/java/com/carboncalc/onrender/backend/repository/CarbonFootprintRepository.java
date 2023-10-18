package com.carboncalc.onrender.backend.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carboncalc.onrender.backend.model.CarbonFootprint;

public interface CarbonFootprintRepository extends JpaRepository<CarbonFootprint, Long> {
    List<CarbonFootprint> findByUserId(Long userId);
    @Query("SELECT cf FROM CarbonFootprint cf WHERE cf.user.username = :username ORDER BY cf.totalEmissions ASC")
    Optional<CarbonFootprint> findLowestEmissionByUser(String username);
}
