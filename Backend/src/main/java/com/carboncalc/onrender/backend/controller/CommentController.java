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

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    private CarbonFootprintService carbonFootprintService;

    @Autowired
    private UserService userService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO) {
    
        CarbonFootprint carbonFootprint = carbonFootprintService
                .getCarbonFootprintById(commentDTO.getCarbonFootprintId());
        User user = userService.getUserById(commentDTO.getUserId());

        Comment comment = new Comment(
                carbonFootprint,
                user,
                commentDTO.getCommentText(),
                commentDTO.getCommentDate());
        Comment createdComment = commentService.saveComment(comment);

        return ResponseEntity.ok(createdComment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable Long id) {
        Comment comment = commentService.getCommentById(id);

        if (comment != null) {
            return ResponseEntity.ok(comment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/footprint/{footprintId}")
    public ResponseEntity<List<Comment>> getCommentsForFootprint(@PathVariable Long footprintId) {
        List<Comment> comments = commentService.getCommentsForFootprint(footprintId);

        return ResponseEntity.ok(comments);
    }
}
