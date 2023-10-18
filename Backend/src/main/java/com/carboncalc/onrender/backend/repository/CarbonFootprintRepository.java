package com.carboncalc.onrender.backend.repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carboncalc.onrender.backend.model.CarbonFootprint;

public interface CarbonFootprintRepository extends JpaRepository<CarbonFootprint, Long> {
        List<CarbonFootprint> findByUserId(Long userId);

        @Query("SELECT cf FROM CarbonFootprint cf WHERE cf.user.username = :username ORDER BY cf.totalEmissions ASC")
        List<CarbonFootprint> findLowestEmissionByUser(@Param("username") String username);

        List<CarbonFootprint> findByUserUsername(String username);

        @Query("SELECT cf FROM CarbonFootprint cf " +
                        "WHERE cf.calculationDate BETWEEN :startDate AND :endDate " +
                        "ORDER BY cf.totalEmissions ASC")
        List<CarbonFootprint> findBestFootprintsThisMonth(
                        @Param("startDate") Date startDate,
                        @Param("endDate") Date endDate);

        @Query("SELECT cf FROM CarbonFootprint cf " +
                        "ORDER BY cf.calculationDate DESC " +
                        "LIMIT 10") 
        List<CarbonFootprint> findRecentFootprints();
}
