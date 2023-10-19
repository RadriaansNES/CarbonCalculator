package com.carboncalc.onrender.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.carboncalc.onrender.backend.repository.CommentRepository;
import com.carboncalc.onrender.backend.model.Comment;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public List<Comment> getCommentsForFootprint(Long footprintId) {
        return commentRepository.findByCarbonFootprint_Id(footprintId);
    }
}
