package com.carboncalc.onrender.backend.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.carboncalc.onrender.backend.model.CarbonFootprint;

public interface CarbonFootprintRepository extends JpaRepository<CarbonFootprint, Long> {
    List<CarbonFootprint> findByUserId(Long userId);
}
