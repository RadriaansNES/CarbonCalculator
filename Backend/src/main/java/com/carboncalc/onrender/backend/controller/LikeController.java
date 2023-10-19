package com.carboncalc.onrender.backend.controller;

import com.carboncalc.onrender.backend.model.Like;
import com.carboncalc.onrender.backend.model.LikeDTO;
import com.carboncalc.onrender.backend.model.CarbonFootprint;
import com.carboncalc.onrender.backend.model.User;
import com.carboncalc.onrender.backend.service.LikeService;
import com.carboncalc.onrender.backend.service.CarbonFootprintService;
import com.carboncalc.onrender.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeController {
    private final LikeService likeService;

    @Autowired
    private CarbonFootprintService carbonFootprintService;

    @Autowired
    private UserService userService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/create")
    public ResponseEntity<Like> createLike(@RequestBody LikeDTO likeDTO) {

        CarbonFootprint carbonFootprint = carbonFootprintService.getCarbonFootprintById(likeDTO.getCarbonFootprintId());
        User user = userService.getUserById(likeDTO.getUserId());

        Like like = new Like(
                carbonFootprint,
                user,
                likeDTO.getLikeDate());
        Like createdLike = likeService.saveLike(like);

        return ResponseEntity.ok(createdLike);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Like> getLike(@PathVariable Long id) {
        Like like = likeService.getLikeById(id);

        if (like != null) {
            return ResponseEntity.ok(like);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/footprint/{footprintId}")
    public ResponseEntity<List<Like>> getLikesForFootprint(@PathVariable Long footprintId) {
        List<Like> likes = likeService.getLikesForFootprint(footprintId);

        return ResponseEntity.ok(likes);
    }
}
