package com.carboncalc.onrender.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.carboncalc.onrender.backend.model.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByUserId(Long userId);
    List<Like> findByCarbonFootprint_Id(Long footprintId);
}