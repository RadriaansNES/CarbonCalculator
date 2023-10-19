package com.carboncalc.onrender.backend.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.carboncalc.onrender.backend.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByUser_Id(Long userId); 
    List<Comment> findByCarbonFootprint_Id(Long footprintId);
}
