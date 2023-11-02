package com.carboncalc.onrender.backend.controller;

import com.carboncalc.onrender.backend.model.CarbonFootprint;
import com.carboncalc.onrender.backend.model.Comment;
import com.carboncalc.onrender.backend.model.CommentDTO;
import com.carboncalc.onrender.backend.model.User;
import com.carboncalc.onrender.backend.service.CommentService;
import com.carboncalc.onrender.backend.service.CarbonFootprintService;
import com.carboncalc.onrender.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    private final CarbonFootprintService carbonFootprintService;
    private final UserService userService;

    @Autowired
    public CommentController(
            CommentService commentService,
            CarbonFootprintService carbonFootprintService,
            UserService userService) {
        this.commentService = commentService;
        this.carbonFootprintService = carbonFootprintService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO) {
        CarbonFootprint carbonFootprint = carbonFootprintService.getCarbonFootprintById(commentDTO.getCarbonFootprintId());
        User user = userService.getUserById(commentDTO.getUserId());

        if (carbonFootprint == null || user == null) {
            return ResponseEntity.notFound().build();
        }

        Comment comment = new Comment(
                carbonFootprint,
                user,
                commentDTO.getCommentText(),
                new java.util.Date());

        Comment createdComment = commentService.saveComment(comment);

        return ResponseEntity.ok(createdComment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable Long id) {
        Comment comment = commentService.getCommentById(id);

        return ResponseEntity.of(Optional.ofNullable(comment));
    }

    @GetMapping("/footprint/{footprintId}")
    public ResponseEntity<List<Comment>> getCommentsForFootprint(@PathVariable Long footprintId) {
        List<Comment> comments = commentService.getCommentsForFootprint(footprintId);

        return ResponseEntity.ok(comments);
    }
}
