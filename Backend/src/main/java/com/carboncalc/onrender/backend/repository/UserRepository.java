/* UserRepository.java */

package com.carboncalc.onrender.backend.repository;

import com.carboncalc.onrender.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username); 
}