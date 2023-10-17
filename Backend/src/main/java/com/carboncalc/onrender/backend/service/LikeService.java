package com.carboncalc.onrender.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.carboncalc.onrender.backend.repository.LikeRepository;
import com.carboncalc.onrender.backend.model.Like;

@Service
public class LikeService {
    private final LikeRepository likeRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public Like saveLike(Like like) {
        return likeRepository.save(like);
    }

    public Like getLikeById(Long id) {
        return likeRepository.findById(id).orElse(null);
    }

    public List<Like> getLikesForFootprint(Long footprintId) {
        return likeRepository.findByCarbonFootprint_Id(footprintId);
    }
}
