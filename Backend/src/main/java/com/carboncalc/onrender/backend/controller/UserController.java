/* UserController.java */

package com.carboncalc.onrender.backend.controller;

import com.carboncalc.onrender.backend.model.User;
import com.carboncalc.onrender.backend.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User created with ID: " + savedUser.getId());
        response.put("id", savedUser.getId());

        return ResponseEntity.ok(response);
    }

    private String generateSecureToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[64]; 

        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials,
            HttpServletResponse response) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        User user = userService.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
       
            String sessionToken = generateSecureToken();

            user.setSessionToken(sessionToken);

            userService.saveUser(user);

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("message", "Login successful");
            responseMap.put("username", username);

            Cookie cookie = new Cookie("authToken", sessionToken);
            cookie.setMaxAge(3600);
            response.addCookie(cookie);

            return ResponseEntity.ok(responseMap);
        } else {
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("message", "Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
        }
    }
}